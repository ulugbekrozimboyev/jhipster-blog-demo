package uz.blog.service;

import org.springframework.beans.factory.annotation.Value;
import uz.blog.domain.Blog;
import uz.blog.repository.BlogRepository;
import uz.blog.service.dto.BlogDTO;
import uz.blog.service.mapper.BlogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

/**
 * Service Implementation for managing {@link Blog}.
 */
@Service
@Transactional
public class BlogService {

    @Value("${upload_path}")
    private String UPLOAD_PATH;

    private final Logger log = LoggerFactory.getLogger(BlogService.class);

    private final BlogRepository blogRepository;

    private final BlogMapper blogMapper;

    public BlogService(BlogRepository blogRepository, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
        this.blogMapper = blogMapper;
    }

    /**
     * Save a blog.
     *
     * @param blogDTO the entity to save.
     * @return the persisted entity.
     */
    public BlogDTO save(BlogDTO blogDTO) throws Exception {
        log.debug("Request to save Blog : {}", blogDTO);
        Blog blog = blogMapper.toEntity(blogDTO);

        String fileName = null;
        String filePath = null;

        if(blogDTO.getMainImgFile() != null){
            fileName = blogDTO.getMainImgFile().getOriginalFilename();
            String prefix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
            String guidFileName = UUID.randomUUID().toString().replace("-", "") + prefix;
            filePath = UPLOAD_PATH + guidFileName;
            File file = new File(filePath);
            try {
                blogDTO.getMainImgFile().transferTo(file);
            } catch (IOException e) {
                throw new Exception("Произошла ошибка при сохранении файла");
            }

            blog.setMainImg(guidFileName);
        }


        blog = blogRepository.save(blog);
        return blogMapper.toDto(blog);
    }

    /**
     * Get all the blogs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<BlogDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Blogs");
        return blogRepository.findAll(pageable)
            .map(blogMapper::toDto);
    }


    /**
     * Get one blog by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BlogDTO> findOne(Long id) {
        log.debug("Request to get Blog : {}", id);
        return blogRepository.findById(id)
            .map(blogMapper::toDto);
    }

    /**
     * Delete the blog by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Blog : {}", id);
        blogRepository.deleteById(id);
    }

    /*
    * update blog
    * eski faylini o'chirish
    *
    * */
    public BlogDTO update(BlogDTO blogDTO) throws Exception {
        log.debug("Request to save Blog : {}", blogDTO);
        Blog blog = blogMapper.toEntity(blogDTO);



        String fileName = null;
        String filePath = null;
        Optional<Blog> optionalOldBlog = blogRepository.findById(blog.getId());
        if(!optionalOldBlog.isPresent()) {
            throw new Exception("Blog not found");
        }

        if(blogDTO.getMainImgFile() != null){
            fileName = blogDTO.getMainImgFile().getOriginalFilename();
            String prefix = fileName.substring(fileName.lastIndexOf("."), fileName.length());
            String guidFileName = UUID.randomUUID().toString().replace("-", "") + prefix;
            filePath = UPLOAD_PATH + guidFileName;
            File file = new File(filePath);
            try {
                blogDTO.getMainImgFile().transferTo(file);
            } catch (IOException e) {
                throw new Exception("Произошла ошибка при сохранении файла");
            }
            blog.setMainImg(guidFileName);

           // diskdan o'chiradi
            File oldFile = new File(UPLOAD_PATH + optionalOldBlog.get().getMainImg());
            oldFile.delete();
        } else {
            blog.setMainImg(optionalOldBlog.get().getMainImg());
        }

        blog = blogRepository.save(blog);
        return blogMapper.toDto(blog);
    }
}

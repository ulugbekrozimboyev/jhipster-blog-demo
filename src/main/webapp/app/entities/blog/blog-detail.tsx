import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './blog.reducer';
import { IBlog } from 'app/shared/model/blog.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBlogDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BlogDetail extends React.Component<IBlogDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { blogEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogDemoApp.blog.detail.title">Blog</Translate> [<b>{blogEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogDemoApp.blog.title">Title</Translate>
              </span>
            </dt>
            <dd>{blogEntity.title}</dd>
            <dt>
              <span id="alias">
                <Translate contentKey="blogDemoApp.blog.alias">Alias</Translate>
              </span>
            </dt>
            <dd>{blogEntity.alias}</dd>
            <dt>
              <span id="mainImg">
                <Translate contentKey="blogDemoApp.blog.mainImg">Main Img</Translate>
              </span>
            </dt>
            <dd>{blogEntity.mainImg}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="blogDemoApp.blog.content">Content</Translate>
              </span>
            </dt>
            <dd>{blogEntity.content}</dd>
            <dt>
              <span id="createdAt">
                <Translate contentKey="blogDemoApp.blog.createdAt">Created At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={blogEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdBy">
                <Translate contentKey="blogDemoApp.blog.createdBy">Created By</Translate>
              </span>
            </dt>
            <dd>{blogEntity.createdBy}</dd>
          </dl>
          <Button tag={Link} to="/entity/blog" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/blog/${blogEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ blog }: IRootState) => ({
  blogEntity: blog.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetail);

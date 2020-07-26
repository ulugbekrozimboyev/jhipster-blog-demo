import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './blog.reducer';
import { IBlog } from 'app/shared/model/blog.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBlogUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBlogUpdateState {
  isNew: boolean;
}

export class BlogUpdate extends React.Component<IBlogUpdateProps, IBlogUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const { blogEntity } = this.props;
      const entity = {
        ...blogEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/blog');
  };

  render() {
    const { blogEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="blogDemoApp.blog.home.createOrEditLabel">
              <Translate contentKey="blogDemoApp.blog.home.createOrEditLabel">Create or edit a Blog</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : blogEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="blog-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="blog-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="blog-title">
                    <Translate contentKey="blogDemoApp.blog.title">Title</Translate>
                  </Label>
                  <AvField id="blog-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="aliasLabel" for="blog-alias">
                    <Translate contentKey="blogDemoApp.blog.alias">Alias</Translate>
                  </Label>
                  <AvField id="blog-alias" type="text" name="alias" />
                </AvGroup>
                <AvGroup>
                  <Label id="mainImgLabel" for="blog-mainImg">
                    <Translate contentKey="blogDemoApp.blog.mainImg">Main Img</Translate>
                  </Label>
                  <AvField id="blog-mainImg" type="text" name="mainImg" />
                </AvGroup>
                <AvGroup>
                  <Label id="contentLabel" for="blog-content">
                    <Translate contentKey="blogDemoApp.blog.content">Content</Translate>
                  </Label>
                  <AvField id="blog-content" type="text" name="content" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="blog-createdAt">
                    <Translate contentKey="blogDemoApp.blog.createdAt">Created At</Translate>
                  </Label>
                  <AvInput
                    id="blog-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.blogEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="blog-createdBy">
                    <Translate contentKey="blogDemoApp.blog.createdBy">Created By</Translate>
                  </Label>
                  <AvField id="blog-createdBy" type="string" className="form-control" name="createdBy" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/blog" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  blogEntity: storeState.blog.entity,
  loading: storeState.blog.loading,
  updating: storeState.blog.updating,
  updateSuccess: storeState.blog.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogUpdate);

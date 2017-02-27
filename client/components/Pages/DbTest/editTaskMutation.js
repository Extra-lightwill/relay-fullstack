/*import Relay from 'react-relay';

export default class editTaskMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Task {
        id,
        text,
      }
    `,
    // TODO: Mark completedCount optional
    viewer: () => Relay.QL`
      fragment on User {
       tasks (first: 10) {
          edges
        }
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{editTask}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on editTaskPayload @relay(pattern: true) {
        todo {
          complete,
        },
        viewer {
          completedCount,
          todos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        viewer: this.props.viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      complete: this.props.complete,
      id: this.props.todo.id,
    };
  }

  /*getOptimisticResponse() {
    const viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.completedCount != null) {
      viewerPayload.completedCount = this.props.complete ?
        this.props.viewer.completedCount + 1 :
        this.props.viewer.completedCount - 1;
    }
    return {
      todo: {
        complete: this.props.complete,
        id: this.props.todo.id,
      },
      viewer: viewerPayload,
    };
  }
}*/
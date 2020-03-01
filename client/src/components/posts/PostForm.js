import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

export default function PostForm() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const errors = useSelector(state => state.errors);

  const [state, setState] = useState({ text: '' });

  // static propTypes = {
  //   addPost: PropTypes.func.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   errors: PropTypes.object.isRequired
  // };


  const onSubmit = e => {
    e.preventDefault();

    const newPost = {
      text: state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };
    dispatch(addPost(newPost));
    setState({ text: '' });
    console.log('submit');
  };

  const onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={state.text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// const mapDispatchToProps = { addPost };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostForm);

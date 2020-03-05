import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';
import { Auth } from '../../types/authTypes';
import { ErrorsRootState } from '../../types/errorTypes';

export default function({ postId }: { postId: string }) {
  const auth = useSelector((state: Auth) => state.auth);
  const errors = useSelector((state: ErrorsRootState) => state.errors);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    text: ''
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      text: state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };
    dispatch(addComment(postId, newComment));
    setState({ text: '' });
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(s => ({ ...s, [name]: value }));
  };
  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Make a comment...</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Comment the post'
                name='text'
                value={state.text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// CommentForm.propTypes = {
//   addComment: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
//   postId: PropTypes.string.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// const mapDispatchToProps = { addComment };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CommentForm);

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorsRootState } from '../../types/errorTypes';
import { Auth } from '../../types/authTypes';

import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

interface PostData {
  text: string;
}

const initialPostData: PostData = {
  text: ''
};

export default function PostForm() {
  const dispatch = useDispatch();
  const errors = useSelector((state: ErrorsRootState) => state.errors);
  const auth = useSelector((state: Auth) => state.auth);

  // const auth = useSelector(state => state.auth);
  // const errors = useSelector(state => state.errors);

  const [postData, setPostData] = useState(initialPostData);

  // static propTypes = {
  //   addPost: PropTypes.func.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   errors: PropTypes.object.isRequired
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost = {
      text: postData.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };
    dispatch(addPost(newPost));
    setPostData({ text: '' });
    console.log('submit');
  };

  const onChange = <M extends React.ChangeEvent<HTMLTextAreaElement>>(e: M) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostData((s: any) => ({ ...s, [name]: value }));
  };

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Something...</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Create a post'
                name='text'
                value={postData.text}
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

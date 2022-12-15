import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    //trim method removes whitespace around string
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <FormControl
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></FormControl>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>{' '}
    </Form>
  );
};

export default SearchBox;

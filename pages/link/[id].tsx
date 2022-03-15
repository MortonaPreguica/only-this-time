import { useMutation } from '@apollo/client';
import  prisma  from '../../lib/prisma';
import { gql } from 'apollo-server-micro';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';


const EditLinkMutation = gql`
  mutation ($title: String!, $url: String!, $category: String!, $description: String!, $imageUrl: String!) {
    editLink (
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`

const Link = ({link}) => {

  const [editLink, { data, loading, error}] = useMutation(EditLinkMutation);

  const {handleSubmit, register, formState: {errors}} = useForm();

  const onSubmit = async (data) => {
    const {title, url, category, description, image} = data;
    const imageUrl = `https://via.placeholder.com/300`;
    const variables = {title, url, category, description, imageUrl};

    try {
      toast.promise(editLink({variables}), {
        loading: 'Edit the link...',
        success: 'Link succesfully edited 🎉',
        error: `Something went wrong 😥 Please try again -  ${errors}`,
      })
    } catch (error) {
      console.error(error);
    }
  }
   

  return(
    <div className='container mx-auto max-w-md py-12'>
      <Toaster />
      <form
        className='grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className='block'>
          <span className='text-gray-700'>Title</span>
          <input
            placeholder='Title'
            name='title'
            type='text'
            {...register('title', { required: true })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={link.title}
          />
          {/* <a>{link.title}</a> */}
        </label>
        <label className='block'>
          <span className='text-gray-700'>Description</span>
          <input
            placeholder='Description'
            {...register('description', { required: true })}
            name='description'
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={link.description}
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Url</span>
          <input
            placeholder='https://example.com'
            {...register('url', { required: true })}
            name='url'
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={link.url}
          />
        </label>
        <label className='block'>
          <span className='text-gray-700'>Category</span>
          <input
            placeholder='Name'
            {...register('category', { required: true })}
            name='category'
            type='text'
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={link.category}
          />
        </label>
        {/* <label className='block'>
          <span className='text-gray-700'>
            Upload a .png or .jpg image (max 1MB).
          </span>
          <input
            {...register('image', { required: true })}
            type='file'
            accept='image/png, image/jpeg'
            name='image'
          />
        </label> */}
        <button
          disabled={loading}
          type="submit"
          className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-6 h-6 animate-spin mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              Editing..
            </span>
          ) : (
            <span>Edit Link</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default Link;

export const getServerSideProps = async ({params}) => {
  const id = params.id;
  const link = await prisma.link.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      title: true,
      category: true,
      url: true,
      imageUrl: true,
      description: true,
    }
  })

  return {
    props: {
      link
    }
  }
}
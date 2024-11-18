import {Helmet} from 'react-helmet-async'

const Meta = ({title, description, keywords}) => {
  return (
  <Helmet>
  <title>{title}</title>
       <meta name='description' content={description} />
       <meta name='keywords' content={keywords} />
  </Helmet>
      
   
  )
}

Meta.defaultProps = {
    title : 'Welcome to JB Store',
    description:'Everything Fashion',
    Keywords:'Shirts, Gowns, Lens, Sneakers and Hoodies'
}

export default Meta

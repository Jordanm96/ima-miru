import React from 'react'
import Layout from '../../components/shared/Layout/Layout'
import Carousel from '../../components/Carousel/Carousel'

const Home = ({user}) => {
    return (
        <div>
            <Layout user={user}>
                Home
                <Carousel/>
            </Layout>
        </div>
    )
}

export default Home

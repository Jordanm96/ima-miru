import React, {useState, useEffect} from 'react'
import Layout from '../../components/shared/Layout/Layout'
import {useParams, Redirect} from 'react-router-dom'
import { getShow, updateShow } from '../../services/shows'

const EditShow = (props) => {
    const [show, setShow] = useState({
        title: '',
        plot: '',
        imgURL: '',
        duration: ''
    })

    const [isUpdated, setUpdated] = useState(false)
    let { id } = useParams()

    useEffect(() => {
        const fetchShow = async () => {
            const show = await getShow(id)
            setShow(show)
        }
        fetchShow()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setShow({
            ...show,
            [name]: value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const updated = await updateShow(id, show)
        setUpdated(updated)
    }

    if (isUpdated) {
        return <Redirect to={`/shows/${id}`} />
    }
    return (
        <Layout user={props.user}>
            <div className="show-edit">
                <div className="image-container">
                    <img className="edit-show-image" src={show.imgURL} alt={show.title} />
                    <form onSubmit={handleSubmit}>
                        <input
                            className="edit-input-image-link"
                            placeholder='Image Link'
                            value={show.imgURL}
                            name='imgURL'
                            required
                            onChange={handleChange}
                        />
                    </form>
                </div>
                <form className="edit-form" onSubmit={handleSubmit}>
                    <input
                        className="input-title"
                        placeholder='Title'
                        value={show.title}
                        name='title'
                        required
                        autoFocus
                        onChange={handleChange}
                    />
                    <input
                        className="input-duration"
                        placeholder='Duration'
                        value={show.duration}
                        name='duration'
                        required
                        onChange={handleChange}
                    />
                    <textarea
                        className="textarea-plot"
                        rows={10}
                        cols={78}
                        placeholder='Plot'
                        value={show.plot}
                        name='plot'
                        required
                        onChange={handleChange}
                    />
                    <button type='submit' className="save-button">Save</button>
                </form>
            </div>
        </Layout>
    )
}

export default EditShow

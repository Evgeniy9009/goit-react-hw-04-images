import { searchPosts } from 'shared/api/api'
import Searchbar from 'components/Searchbar/Searchbar'
import Loader from 'shared/Loader/Loader'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Modal from 'shared/Modal/Modal'


import { useState } from 'react'
import { useEffect } from 'react'

export default function PostsSearch() {

    const [totalHits, setTotalHits] = useState(null)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({ largeImageURL: "" })
    const [firstLoad, setFirstLoad] =useState(true)

    // const async fetchPosts = () => {
    //     setLoading(true)
        
    //     try {
    //         const data = await searchPosts(search, page)
    //         const hits = data.hits
    //         const totalHits = data.totalHits
    //         console.log("totalHits : ", totalHits)
    //         console.log("items.length : ", items.length)
    //         setTotalHits(totalHits)
    //         setItems((items)=> [...items, ...hits])
    //     }
    //     } catch (error) {
    //     setError(error)    
    //     } finally {
    //     setLoading(false)
    //     }


    useEffect(() => {
        if (firstLoad) 
            return setFirstLoad(false)
        const fetchPosts = async () => {
            setLoading(true)

            try {
                const data = await searchPosts(search, page)
                const hits = data.hits
                const totalHits = data.totalHits
                console.log("totalHits : ", totalHits)
                console.log("items.length : ", items.length)
                setTotalHits(totalHits)
                setItems((items) => [...items, ...hits])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
            fetchPosts(search, page)
    }, [page, search])

    const onSearch = (newSearch) => {
        setItems([])
        setSearch(newSearch)
        setPage(1)
  }

    const loadMore = () => {
        setPage((page) => page + 1)
    }

    const openModal = (modalContent) => {
        console.log("openModal", modalContent)
        setModalOpen(true)
        setModalContent(modalContent)
    }

    const closeModal = () => {
        setModalOpen(false)
        setModalContent({largeImageURL: ''})
    }

    return (
    <>
        <Searchbar  onSubmit={onSearch}/>
        {error && <p>Будь ласка спробуйте пізніше...</p>}
        {totalHits === 0 && <p>Нічього не знайдено...</p>}
        {items.length && <ImageGallery items={items} onClick={openModal} largeImageURL={modalContent.largeImageURL} />}
        {loading &&<Loader />} 
        {!loading && 0 < items.length && items.length < totalHits && <Button onClick={loadMore} text="Load more" />}
        {/* {!loading && 0 < items.length < totalHits-1 && <Button onClick={loadMore} text="Load more" />} */}
        {modalOpen && <Modal onClose={closeModal} modalContent={modalContent} />}

    </>
    )
}


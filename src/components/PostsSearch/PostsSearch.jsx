import { Component } from 'react'

import { searchPosts } from 'shared/api/api'
import Searchbar from 'components/Searchbar/Searchbar'
import Loader from 'shared/Loader/Loader'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Modal from 'shared/Modal/Modal'

export default class PostsSearch extends Component {

  state = {
    totalHits: null,
    items: [],
    loading: false,
    error: null,
    search: "",
    page: 1,
    modalOpen: false,
    modalContent: {
      largeImageURL: "",
    }
  }

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state

    if (prevState.search !== search || page !== prevState.page) {
      this.fetchPosts(search, page)
    }   
    }
  

  // async fetchPosts() {
  //   const { search, page } = this.state
  //   this.setState({
  //     loading: true
  //   })
  //   try {
  //     const data = await searchPosts(search, page)
  //     this.setState(() => {
  //       return {
  //         items: [...data]
  //       }
  //     })
  //   } catch (error) {
  //     this.setState({
  //       error
  //     })      
  //   } finally {
  //     this.setState({
  //       loading: false
  //     })
  //   }
  // }

  async fetchPosts() {
    const { search, page } = this.state
    this.setState({
      loading: true
    })
    try {
      const data = await searchPosts(search, page)
      const hits = data.hits
      const totalHits = data.totalHits
      console.log("totalHits : ", totalHits)
      console.log("items.length : " , this.state.items.length)
      this.setState(({ items }) => {
        return {
          totalHits,
          items: [...items, ...hits]
        }
      })
    } catch (error) {
      this.setState({
        error
      })      
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  onSearch = ({ search }) => {
    if (this.state.search !== search) {
      this.setState(() => {
        return {
          items: [],
          search,
          page: 1,
        }
      })
    }
  }

 loadMore = () => {
    this.setState(({ page }) => {
      console.log(page)
        return {
            page: page + 1
        }
    })
  }

openModal = (modalContent) => {
    console.log("openModal", modalContent)
    console.log( "openModal", modalContent)
    this.setState({
      modalOpen: true,
      modalContent
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: {
        largeImageURL: '' }
    })
  }

  

  render() {
    const { totalHits ,items, loading, error, modalOpen, modalContent } = this.state;
    const { onSearch, loadMore, openModal, closeModal } = this
    console.log(!loading, items.length, totalHits)
    console.log( Boolean(0 < items.length < totalHits) )

    return (
      <>
        <Searchbar onSubmit={onSearch} />
        {modalOpen && <Modal onClose={closeModal} modalContent={modalContent} />}
        
        {error && <p>Будь ласка спробуйте пізніше...</p>}
        {totalHits === 0 && <p>Нічього не знайдено...</p>}
        {items.length && <ImageGallery items={items} onClick={openModal} largeImageURL={modalContent.largeImageURL} />}
        {loading &&<Loader />} 
        {!loading && 0 < items.length && items.length < totalHits && <Button onClick={loadMore} text="Load more" />}
        {/* {!loading && 0 < items.length < totalHits-1 && <Button onClick={loadMore} text="Load more" />} */}
      </>
    )
  }
}
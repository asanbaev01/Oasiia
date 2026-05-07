import { useState, useEffect } from 'react'
import '../../assets/style/gallery.css'
import { getGalleryCategories, getGalleryImages } from '../../services/Api'
import { useTranslation } from "react-i18next"; // Кошулду

function GalleryImgs() {
  const { t } = useTranslation(); // Хук кошулду
  const [categories, setCategories] = useState([])
  const [activeBtn, setActiveBtn] = useState('all')
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [animatedItems, setAnimatedItems] = useState([])
  const [heroAnimated, setHeroAnimated] = useState(false)
  const [filterAnimated, setFilterAnimated] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getGalleryCategories()
        const catData = Array.isArray(catRes.data)
          ? catRes.data
          : (catRes.data.results || [])

        // "Все" баскычын JSON'догу "gallery.all" мааниси менен түзөбүз
        const allCat = { id: 'all', name: t("gallery.all"), key: 'all' }
        setCategories([allCat, ...catData])
        await loadImages('all', 'all')
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()

    setTimeout(() => setHeroAnimated(true), 100)
    setTimeout(() => setFilterAnimated(true), 300)
  }, [t]) // t кошулду, тил алмашса "Все" деген сөз жаңыртылат

  const loadImages = async (categoryKey, categoryId) => {
    setIsLoading(true)
    setActiveBtn(categoryId)
    setAnimatedItems([])
    try {
      const param = categoryKey === 'all' ? '' : categoryKey
      const res = await getGalleryImages(param)
      const imgData = Array.isArray(res.data)
        ? res.data
        : (res.data.results || [])
      setImages(imgData)
      
      setTimeout(() => {
        imgData.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedItems(prev => [...prev, index])
          }, index * 60)
        })
      }, 150)
    } catch (err) {
      console.error(err)
      setImages([])
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (index) => {
    setCurrentIndex(index)
    setCurrentImage(images[index])
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentImage(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < images.length) {
      setCurrentIndex(nextIndex)
      setCurrentImage(images[nextIndex])
    }
  }

  const prevImage = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex)
      setCurrentImage(images[prevIndex])
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen, currentIndex, images])

  return (
    <>
      <div className="pageWrapper">
        <div className={`heroSection ${heroAnimated ? 'heroAnimated' : ''}`}>
          <div className="heroInner">
            <h1 className="heroTitle">{t("gallery.pageTag")}</h1>
            <p className="heroSubtitle">{t("gallery.pageTitle")}</p>
          </div>
        </div>

        <div className={`filterBar ${filterAnimated ? 'filterAnimated' : ''}`}>
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => loadImages(cat.key || cat.slug, cat.id)}
              className={`filterItem ${activeBtn === cat.id ? 'filterItemActive' : ''}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* "Все" баскычы үчүн котормону колдонобуз, калганы API'ден келет */}
              {cat.id === 'all' ? t("gallery.all") : cat.name}
            </button>
          ))}
        </div>

        <div className="contentWrap">
          {isLoading ? (
            <div className="loaderWrapper">
              <div className="loader"></div>
              <p className="statusText">Загрузка...</p>
            </div>
          ) : images.length === 0 ? (
            <p className="statusText fadeInText">Фотографии не найдены</p>
          ) : (
            <div className="gridLayout">
              {images.map((img, i) => (
                <div 
                  key={img.id || i} 
                  className={`gridItem ${animatedItems.includes(i) ? 'gridItemAnimated' : ''}`}
                  style={{ transitionDelay: `${i * 0.05}s` }}
                  onClick={() => openModal(i)}
                >
                  <img 
                    src={img.image_file || img.image} 
                    alt={img.title || ""} 
                    className="gridImage" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {modalOpen && currentImage && (
        <div className="modalOverlay" onClick={closeModal}>
          <button className="modalClose" onClick={closeModal}>×</button>
          <button className="modalPrev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <button className="modalNext" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentImage.image_file || currentImage.image} 
              alt={currentImage.title || ""} 
              className="modalImage" 
            />
            {currentImage.title && (
              <div className="modalCaption">{currentImage.title}</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryImgs;
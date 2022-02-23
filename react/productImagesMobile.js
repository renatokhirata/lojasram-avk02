import styles from "./productImages";
import useProduct from "vtex.product-context/useProduct";
import React, { useMemo, useState, useEffect } from 'react';
import { Slider, Slide, SliderContainer } from 'vtex.slider';

export default function ProductImagesMobile() {

    const [currentSlide, setCurrentSlide] = useState(1);

    const perPage = {
        1300: 1,
        700: 1,
        600: 1,
        300: 1
    };

    const handleChangeSlide = value => {
        setCurrentSlide(value)
    }
    
    const productDetails = useProduct();
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const {
            selectedItem
        } = productDetails;

        if (!selectedItem || selectedItem === null) {
            setImages([]);
            return;
        }
        
        console.log("SELECTED ITEM: ", selectedItem);

        const {
            selectedItem: {
                images: productImages
            }
        } = productDetails;
        
        console.log("IMAGES: ", productImages);

        setImages(productImages);
    }, [productDetails]);

    useEffect(() => {}, [images]);

    return (
        <>
            {
                images.length > 0 ?
                    <SliderContainer className={styles.containerSlider}>
                        <Slider
                            perPage={perPage}
                            currentSlide={currentSlide}
                            onChangeSlide={handleChangeSlide}
                            resizeDebounce={0}
                            arrowRender={arrowRender}
                            arrowsContainerComponent={arrowContainerRender}
                            loop>
                            {
                                images.map((img) => {
                                    {img}
                                    return (
                                        <div>
                                            <img src={img.imageUrl} alt={img.imageText}/>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </SliderContainer>
                : null
            }
        </>
    )
}

export const arrowRender = ({ orientation, onClick }) => {
    return (
        <div className={styles[orientation]} >
            {
                orientation === 'left' ? (
                    <span className={styles.arrow} style={{ left: '10px' }} onClick={onClick}>
                        <LeftIcon />
                    </span>
                ) : (
                    <span className={styles.arrow} style={{ right: '10px' }} onClick={onClick}>
                        <RightIcon />
                    </span>
                )
            }
        </div>
    )
}

export const arrowContainerRender = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

const LeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="22" viewBox="0 0 11 22"><g><g><path fill="#999" d="M.284 10.968a.61.61 0 0 0 .157.409l9.255 10.228a.609.609 0 1 0 .903-.817l-8.885-9.82 8.885-9.82A.609.609 0 1 0 9.696.33L.44 10.56a.606.606 0 0 0-.157.408z" /></g></g></svg>
)

const RightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="22" viewBox="0 0 11 22"><g><g><path fill="#999" d="M10.756 10.968a.606.606 0 0 0-.157-.408L1.344.33a.608.608 0 1 0-.903.818l8.885 9.82-8.885 9.82a.61.61 0 0 0 .903.817l9.255-10.228a.61.61 0 0 0 .157-.41z" /></g></g></svg>
)
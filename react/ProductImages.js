import useProduct from "vtex.product-context/useProduct"
import React, { useState, useLayoutEffect, useEffect } from "react"
import styles from "./productImages"

export default function ProductDescription() {
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
                    <div className={styles.productImages}>
                        {
                            images.map((img, i) => {
                                return (
                                    <div>
                                        <img src={img.imageUrl} alt={img.imageText}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                : null
            }
        </>
    )
}
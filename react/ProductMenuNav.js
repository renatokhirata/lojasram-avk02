import React, { useEffect } from "react";
import useProduct from "vtex.product-context/useProduct";
import style from "./product.css";

export default function ProductMenuNav() {
    const ProductContext = useProduct();

    const {
        product
    } = ProductContext;

    if (!product || product === null) return null

    const {
        product: {
            description,
            specificationGroups
        }
    } = ProductContext;

    return (
        <ul className={style.productNav}>
            {
                description != "" ?
                    <li>
                        <a href="#description">Descrição</a>
                    </li>
                : null
            }
            {
                specificationGroups ?
                    <>
                        {
                            specificationGroups.length > 0 ?
                                <li>
                                    <a href="#specification">Especificações</a>
                                </li>
                            : null
                        }
                    </>
                : null
            }
        </ul>
    );
}
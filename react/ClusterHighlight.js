import style from "./clusterHighlight.css";
import React from "react";
import useProduct from "vtex.product-context/useProduct";

function Flag() {
    const productDetail = useProduct();
    const {
        product: {
            clusterHighlights
        }
    } = productDetail;

    return (
        clusterHighlights.length > 0 ?
            <div className={style.flag}>
                {clusterHighlights[0].name}
            </div>
            : null
    )
}

export default Flag
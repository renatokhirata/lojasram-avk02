import React, { useMemo } from "react";
import useProduct from "vtex.product-context/useProduct";

export default function ProductReference() {
    const ProductContext = useProduct();

    const {
        selectedItem
    } = ProductContext;

    if (!selectedItem || selectedItem === null) return null

    const {
        selectedItem: {
            referenceId
        }
    } = ProductContext;

    if (!referenceId || !referenceId.length) return null;

    if (referenceId[0].Key == "RefId") {
        return (
            <div style={{
                color: "#707070",
                fontSize: ".9rem",
                borderRight: "1px solid #dedede",
                marginRight: "15px",
                paddingRight: "15px",
                textTransform: "uppercase"
            }}>
                Cód: {referenceId[0].Value}
            </div>
        );
    } else {
        return null;
    }
}
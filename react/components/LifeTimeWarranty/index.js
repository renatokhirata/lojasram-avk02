import React, { useEffect, useLayoutEffect, useState } from 'react'
import useProduct from "vtex.product-context/useProduct"

export default function LifeTimeWarranty({ children }) {
    const { product } = useProduct()
    const [cluster, setCluster] = useState([])
    
    useEffect(() => product && setCluster(product.productClusters), [])

    return (
        <>
            { cluster.length > 0 && Number(cluster[0].id) === 138 && <>{children}</>}
        </>
    )
}

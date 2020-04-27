import React, { useState } from 'react'

const BillContext = React.createContext()

function BillProvider(props) {
    const [list, setList] = useState(
        [
            {
                name: 'خبز توست لوزين',
                code: 'njjjj',
                avatar_url: require('./assets/images/bread.jpg'),
                price: 1.1,
                quntity: 2,
            },
            {
                name: ' لبن المراعي كبير',
                code: 'hbj',
                avatar_url: require('./assets/images/laban.jpg'),
                price: 6.0,
                quntity: 1
            },
        ]
    )

    const { children } = props


    return (
        <BillContext.Provider
            value={{
                list,
                setList,
            }}
        >
            {children}
        </BillContext.Provider>
    )



}

export { BillProvider }
export default BillContext


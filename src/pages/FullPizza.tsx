import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type FullPizzaProps = {
    imageUrl: string;
    price: number;
    title: string;
}

const FullPizza: React.FC = () => {
    const { id } = useParams();

    const [pizza, setPizza] = React.useState<FullPizzaProps>()

    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://627bb319b54fe6ee008d303d.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <h1>loading...</h1>
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;
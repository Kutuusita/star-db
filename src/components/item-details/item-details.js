import React, {Component}  from 'react';
import ErrorButton from '../error-button';
import Spinner from '../spinner';

import './item-details.css';

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    )
}

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        image: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem() {
        this.setState({ 
            loading: true,
        });
        const { itemId, getData, getImageUrl } = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({ 
                    item,
                    loading: false,
                    image: getImageUrl(item)
                });
            });
    }

    render() {

        const { item, image } = this.state;
        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const { name } = item;

        if (this.state.loading) {
            return <Spinner />;
        }

        return (
        <div className="item-details card">
            <img className="item-image"
            src={ image } alt= { name }/>

            <div className="card-body">
            <h4>{ name }</h4>
            <ul className="list-group list-group-flush">
                { 
                    React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item});
                    })
                }
            </ul>
            <ErrorButton />
            </div>

        </div>
        )
    }
}
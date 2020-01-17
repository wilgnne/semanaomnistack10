import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import captalizeString from '../../utils/captalizeString';

import './styles.css';

function DevItem({dev, onDestroy, onEdit}) {
    function handleDestroy() {
        onDestroy(dev);
    }

    function handleEdit() {
        onEdit(dev);
    }

    return (
        <li className="dev-item">
            <div className="dev-item-controllers">
                <button 
                    onClick={handleEdit}
                    className="controller-button"
                >
                    <EditIcon style={item_controller} />
                </button>
                <button 
                    onClick={handleDestroy} 
                    className="controller-button"
                >
                    <DeleteIcon style={item_controller} />
                </button>
            </div>
            <div className="dev-item-body">
            
                <header>
                    <img 
                        src={dev.avatar_url}
                        alt={dev.name} 
                    />
                    <div className="user-info">
                        <strong>{dev.name}</strong>
                        <span>{dev.techs.map(captalizeString).join(', ')}</span>
                    </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no GitHub</a>
            </div>
        </li>
    );
}

const item_controller = {
    color: '#7d40e7',
}

export default DevItem;
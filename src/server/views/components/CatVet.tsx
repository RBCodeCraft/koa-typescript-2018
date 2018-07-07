
import * as React from 'react';
import { Cat } from '../../models/cat';

export interface ICatVetProps {
    cat: Cat;
}

export function CatVet(props: ICatVetProps) {
    return (
        <div className="card" style={{ width: 400, margin: 'auto'}}>
            <div className="card-body">

                <h5 className="card-title">Cat Information</h5>

                <p className="card-text"><small>
                    Please review {props.cat.name}'s information before submitting
                </small></p>

                <CatVetForm cat={props.cat} />

            </div>
        </div>
    );
}

export function CatVetForm(props: ICatVetProps) {
    return (
        <form action="/catvet" method="post">

            <input type="hidden" name="id" value={props.cat.id} />

            <div className="form-group">
                <label>Cat Name</label>
                <input name="name" type="text" className="form-control"
                    value={props.cat.name} readOnly />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input name="age" type="text" className="form-control"
                    value={props.cat.age} readOnly />
            </div>

            <div className="form-check">
                <input name="likesFish" type="checkbox" className="form-check-input"
                    checked={props.cat.likesFish} readOnly />
                <label className="form-check-label">Likes Fish</label>
            </div>

            &nbsp;<br />
            <button type="submit" className="btn btn-primary">Send to CatVet (tm)</button>

        </form>
    );
}

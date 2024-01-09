import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as service from "../../services/TimesCrudServices";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/AuthServices";

const AddWork = ()=>{
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {id} = useParams();
    const [items, setItems] = useState({
        date:'',
        company:'',
        service:'',
        description:'',
        from:'',
        to:'',
        uid:''
    })

    useEffect(()=>{
        id && service.showById(item=>setItems(item), id)
    }, [id])

   

    const handleChange = (e)=>{
        const value = e.target.value;
        setItems({
            ...items,
            [e.target.name]:value
        })
    }

    const submitHandler  = (e)=>{
        e.preventDefault();
        if(id){
            service.updateWork(id,items);
        }else{
            service.addWork({
                ...items,
                uid:user.uid
            });
        }
       
        navigate("/");
    }

    return(
    <div className="card">
        <div className="card-header">
            <h2>Pridėti atliktą darbą</h2>
        </div>
        <div className="card-body">
            <form className="form" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="date">Pasirinkite datą:</label>
                    <input onChange={handleChange} className="form-control" id="date" type="date" name="date" value={items.date}/>
                </div>
                <div className="mb-3">
                    <select onChange={handleChange} name="company" id="company" className="form-control" value={items.company}>
                        <option value="kb">Kilobaitas</option>
                        <option value="it">IT sfera</option>
                    </select>
                </div>
                <div className="mb-3">
                    <select onChange={handleChange} name="service" id="service" className="form-control" value={items.service}>
                        <option value="dev">Development</option>
                        <option value="ux">UX design</option>
                    </select>
                </div>
                <div className="mb-3">
                    <textarea onChange={handleChange} name="description" id="description"  className="form-control" placeholder="Darbo aprašymas" value={items.description}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="from">Nuo:</label>
                    <input onChange={handleChange} type="time" id="from" name="from" value={items.form} />
                </div>
                <div className="mb-3">
                    <label htmlFor="to">Iki:</label>
                    <input onChange={handleChange} type="time" id="to" name="to" value={items.to}/>
                </div>
                <div className="mb-3">
                    {(id)?
                     <button type="submit">Atnaujinti</button>:
                     <button type="submit">Saugoti</button>
                }
                    
                </div>
                <Link className="btn btn-danger" aria-current="page"to="/">Atšaukti</Link>
            </form>
        </div>
    </div>
    )
}

export default AddWork
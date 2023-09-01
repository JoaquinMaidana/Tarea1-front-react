import DefaultLayout from "../layout/DefaultLayout";
export default function SignUp(){
    return(
        <>
        <DefaultLayout>           
            
            <div class="container d-flex justify-content-center align-items-center w-100 h-100 ">
                <div class="row w-100">
                    <div class="col-4 m-auto">
                        <h1>Registro</h1>
                        <form class="mt-5">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nickname</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                               
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Correo</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"/>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Registrarme</button>
                        </form>
                    </div>

                </div>
               
            </div>
        </DefaultLayout>
    </> 
    ); 
}
import axios from "axios";

export async function saveOutwordEntry(data){

    const res=await axios.post("http://localhost:8080/saveOutwordData",data);
    return res;

}

export async function saveInwordEntry(data){
    const res=await axios.post("http://localhost:8080/saveInword",data);
    return res;
}

export async function getInwordReport(date){
    const res=await axios.get(`http://localhost:8080/getAllInwordDataByDate?date=${date}`);
    return res;
}

export async  function getOutwordDataByTeacherName(name){
    const res=await axios.get(`http://localhost:8080/getOutwordDataByTeacherName?teacherName=${name}`);
    return res;
}

export async function getOutwordReportByName(name){
    const res=await axios.get(`http://localhost:8080/getOutwordReportByName?teacherName=${name}`)
    return res;
}
export async  function getOutwordDataByDate(date){
    const res=await axios.get(`http://localhost:8080/getOutwordDataByDate?date=${date}`);
    return res;
}

export async  function getOutwordReportByDate(date){
    const res=await axios.get(`http://localhost:8080/findByDateReport?date=${date}`);
    return res;
}


export async  function getAllData( ){
    const res=await axios.get(` http://localhost:8080/getAllData`);
    return res;
}

export async function getDataById(id){
    const res=await axios.get(` http://localhost:8080/getById?id=${id}`)
    return res;
}

export async function updateData(data){
    const res=await axios.post(` http://localhost:8080/updateOutwordData`,data)
    return res;
}

export async function deleteDataById(id){
    const res=await axios.get(` http://localhost:8080/deleteById?id=${id}`)
    return res;
}

export async function saveEmployeeData(data){
    const res=await axios.post(` http://localhost:8080/saveEmployee`,data)
    return res;
}

export async function getAllEmployeeData(){
    const res=await axios.get(`http://localhost:8080/getAllEmployeeData`);
    return res;
}


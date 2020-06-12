import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/tutorials';
const usersUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }

   //actions for users

  getAllUsers() {
    return this.http.get(usersUrl);
  }

  getUserbyId(id) {
    return this.http.get(`${usersUrl}/${id}`);
  }

  createUser(data) {
    return this.http.post(usersUrl, data);
  }

  updateUser(id, data) {
    return this.http.put(`${usersUrl}/${id}`, data);
  }

  deleteUser(id) {
    return this.http.delete(`${usersUrl}/${id}`);
  }

  deleteAllUsers() {
    return this.http.delete(usersUrl);
  }

  findUser(email, password) {
    return this.http.get(`${usersUrl}?email=${email}&password=${password}`);
  }
  findByEmail(email) {
    return this.http.get(`${usersUrl}?email=${email}`);
  }
}
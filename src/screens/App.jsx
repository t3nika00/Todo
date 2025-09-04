import { useEffect, useState } from 'react'
import { useUser } from '../context/useUser'
import axios from 'axios'
import Row from '../components/Row'

const url = "http://localhost:3001"

function App() {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])
    const { user } = useUser()

    const addTask = () => {
        const headers = { headers: { Authorization: user.token } }
        const newTask = { description: task }

        axios.post(url + "/create", { task: newTask }, headers)
            .then(response => {
                setTasks([...tasks, response.data])
                setTask('')
            })

    }

    const deleteTask = (deleted) => {
        const headers = { headers: { Authorization: user.token } }
        console.log(headers)
        axios.delete(url + "/delete/" + deleted, headers)
            .then(response => {
                setTasks(tasks.filter(item => item.id !== deleted))
            })
    }
}

export default App
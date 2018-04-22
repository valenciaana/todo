<template>
    <div class="container">
        <div class="box">
            <div class="field is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="Nuevo recordatorio" v-model="todoItemText">
                </p>
                <p class="control">
                    <a class="button is-info" @click="addTodo">
                        Agregar
                    </a>
                </p>
            </div>
        </div>
        <table class="table is-bordered">
            <tr v-for="(todo, index) in items" :key="index">
                <td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': todo.done }" @click="toggleDone(todo)">
                    {{ todo.text }}
                </td>
                <td class="is-narrow">
                    <a class="button is-danger is-small" @click="removeTodo(todo)">Eliminar</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    function Crud({ id, text, done}) {
        this.id = id;
        this.text = text;
        this.done = done;
    }
    /**
     * Tips:
     * - En mounted pueden obtener el listado del backend de todos y dentro de la promesa de axios asirnarlo
     *   al arreglo que debe tener una estructura similar a los datos de ejemplo.
     * - En addTodo, removeTodo y toggleTodo deben hacer los cambios pertinentes para que las modificaciones,
     *   addiciones o elimicaiones tomen efecto en el backend asi como la base de datos.
     */
    export default {
        data () {
            return {
                todoItemText: '',
                items: [],
            }
        },
        mounted () {
            /*this.items = [
                { text: 'Primer recordatorio', done: true },
                { text: 'Segundo recordatorio', done: false },
                { text: 'Tercero recordatorio', done: false },
                { text: 'Cuarto recordatorio', done: true },
                { text: 'Quinto recordatorio', done: false },
            ]*/
            this.mute = true;
            window.axios.get('/api/todos').then(({ data }) => {
                data.forEach(todo => {
                    console.log(todo)
                    this.items.push(new Todo(todo));
                });
            this.mute = false;
            });
            console.log(this.items);
        },
        methods: {
            addTodo () {
                let text = this.todoItemText.trim()
                if (text !== '') {
                    this.items.push({ text: text, done: false })
                    this.todoItemText = ''
                }
            },
            removeTodo (todo) {
                this.items = this.items.filter(item => item !== todo)
            },
            toggleDone (todo) {
                todo.done = !todo.done
            }
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>

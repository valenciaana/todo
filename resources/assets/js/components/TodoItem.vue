<template>
    <tr>
        <td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': done }" @click="toggleDone({id,text,done})">
            {{ text }}
        </td>
        <td class="is-narrow">
            <a class="button is-danger is-small" @click="removeTodo({id,text,done})">Eliminar</a>
        </td>
    </tr>
</template>
<script>
    export default {
        props: ['id', 'text', 'done'],
        methods: {
            toggleDone(todo){
                this.$emit('toggleDone', todo);
            },
            removeTodo(todo){
                this.$emit('removeTodo', todo);
            }
        }
    }
</script>
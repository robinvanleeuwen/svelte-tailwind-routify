<script>
    export let type = "text";
    export let name;
    export let label;
    export let size = 30;
</script>

<input
    class="input-class"
    type={type}
    name={name}
    placeholder={label}

/>

<style>
    .input-class {
        width: 90%;
        padding: 5px;
        margin-left: 3px;
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 3px;
        margin-bottom: 5px;
    }
    .input-class[type=text]:focus {
        background-color: lightblue;
    }
</style>
<script>
    export let background;
    export let width = '';
    export let style = "";
</script>

<div style="background: {background}; {width? `width: ${width};`: ''} {style}">
    <slot/>
</div>

<style>
    div {
        padding: 1%;
        padding-left: 2vw;
        padding-right: 2vw;

        border-radius: 1vh;
    }
</style>
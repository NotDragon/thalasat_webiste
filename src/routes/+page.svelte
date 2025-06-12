<script>
	import { color_palette_light } from "$lib/colors";
    import Panel from "$lib/components/Panel.svelte";
    import { goto } from '$app/navigation';
    import Carousel from "$lib/components/Carousel.svelte";

</script>

<main>
    <div id="header">
        <h1>Thalasat</h1>
        <p>Moto</p>
    </div>
    <div id="mission" style="background-color: {color_palette_light.secondaryBackground}; color: {color_palette_light.primaryDark}">
        <Panel background={color_palette_light.background} width="30vw">
            <h2>The Problem</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis.</p>
            <button style="background-color: {color_palette_light.primary}; color: {color_palette_light.background}" onclick={() => {goto("/about#algal_blooms")}}>Learn More</button>
        </Panel>

        <Panel background={color_palette_light.background} width="50vw" extraStyle="margin-left: 2vw">
            <h2>Our Solution</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            <button style="background-color: {color_palette_light.primary}; color: {color_palette_light.background}" onclick={() => {goto("/about")}}>Learn More</button>
        </Panel>
    </div>

    <div id="work" style="color: {color_palette_light.primaryDark}">
        <h2>How Thalasat Works</h2>
        <Carousel style="width: 80vw">
            <Panel background={color_palette_light.secondaryBackground}>
                <h3>Our Solution</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            </Panel>
            <Panel background={color_palette_light.secondaryBackground}>
                <h3>Our Solution2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            </Panel>
            <Panel background={color_palette_light.secondaryBackground}>
                <h3>Our Solution</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            </Panel>
            <Panel background={color_palette_light.secondaryBackground}>
                <h3>Our Solution2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            </Panel>
            <Panel background={color_palette_light.secondaryBackground}>
                <h3>Our Solution</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
            </Panel>
        </Carousel>
    </div>
</main>

<style>
    #header {
        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        height: 100vh;

        background:
			linear-gradient(rgba(0, 16, 33, 0.6), rgba(0, 0, 0, 0.25)), url('/images/venice_region.jpg') fixed;
		background-size: cover;
		background-position: center;

        width: 100%;
		overflow: hidden;
    }


    #header h1, p {
		position: relative;
		z-index: 1;
	}

    #header h1 {
        font-size: 5vw;
    }

    #mission {
        padding-top: 2vh;
        padding-bottom: 2vh;
        display: flex; 
        justify-content: center;
        text-align: center;
        
    }

    #mission h2 {
        font-size: 3vw;
        margin-bottom: 2vh;
    }

    #mission button {
        border: none;
        aspect-ratio: 4/1;
        width: 15vw;
        margin-top: 2vh;
        border-radius: 0.4vh;
    }

    #mission button:hover {
        cursor: pointer;
    }

    #work {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 2vh;
        padding-bottom: 2vh;
    }

    #work h2 {
        font-size: 3vw;
    }

    #work h3 {
        font-size: 1.5vw;
    }
</style>
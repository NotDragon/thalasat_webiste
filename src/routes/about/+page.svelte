<script>
    import { color_palette_light } from "$lib/colors";
</script>
<div id="header" style="color: {color_palette_light.background}">
    <h1>About Thalasat</h1>
    <p id="description">We use satellite data to monitor and protect the sea.</p>
</div>

<div id="mission" style="background-color: {color_palette_light.background}; color: {color_palette_light.primaryDark}">
    <div id="about-container">
        <h1>About us</h1>
        <p id="austrian-guy-with-cool-mustache">Thalasat is a for-profit organization dedicated to the preservation of marine environments.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis euismod eros. Sed venenatis non nisi feugiat ullamcorper. Vestibulum lorem ex, efficitur vitae dui et, venenatis tempor enim. Nulla nec leo in massa lobortis tristique. Curabitur nec odio non ipsum eleifend egestas. Etiam placerat congue consectetur. Nulla non nisi vel enim tincidunt ultrices a in turpis. Nulla fermentum est eget risus condimentum, a dignissim tortor convallis. Morbi elementum augue quis est malesuada rutrum. Nulla semper lectus a erat maximus, eu faucibus purus molestie. Praesent varius commodo neque, non pharetra libero blandit ac.</p>
        
    </div>
</div>


<style>
    #header {
        display: flex; 
        flex-direction: column;
        /* justify-content: center; */
        align-items: center; 
        height: 100vh; 
        padding-top: 25vh;
        
        background:
			linear-gradient(rgba(0, 16, 33, 0.6), rgba(0, 0, 0, 0.25)), url('/images/cyprus_akamas.jpg') fixed;
        height: 50vh;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    p {
        font-size: 1.2em;
        line-height: 1.5;
        
    }
    #description{
        font-size: 1.2em;
        line-height: 1.5;
        padding-top: -4px;
        border-radius: 10px;
        
    }

    #mission {
        display: flex; 
        flex-direction: column;
        align-items: center; 
       
    }

    #about-container {
        border: 2px solid #57c2e2;
        width: 40vw;
        background-color: #e4e4e4;
        margin: 2vw;
        
        border-radius: 10px;

    }
    #about-container h1 {
        font-size: 2vw;
        margin-bottom: 2vh;
        text-align: center;
        text-decoration: underline #0CAADC;

    }
    
    #austrian-guy-with-cool-mustache {
        font-size: 1.2em;
        line-height: 1.5;
        padding-top: -4px;
        
        text-align: center;
        padding-top: 1vw;
        border-radius: 10px;
    }
</style>    
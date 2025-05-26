<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
    import { color_palette_light } from '$lib/colors';

	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map;

  // Available dates — every 5 days (manually list or fetch this)

    const availableDates: string[] = [];
    let current = new Date("2024-05-20");

    while (current <= new Date("2025-05-20")) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        availableDates.push(`${yyyy}-${mm}-${dd}`);
        current.setDate(current.getDate() + 5);
    }

   	let dateIndex = 0;
	$: date = availableDates[dateIndex];

	let mapMode = 'sst';

	onMount(() => {
		map = new maplibregl.Map({
		container: mapContainer,
		maxBounds: [5.4266, 35.7281, 25.8429, 47.8],
		style: {
			version: 8,
			sources: {
			osm: {
				type: 'raster',
				tiles: ['https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'],
				tileSize: 256,
				attribution: '© OpenStreetMap contributors'
			},
			overlay: {
				type: 'raster',
				tiles: [
				`/${mapMode}-tilemaps/${date}/{z}/{x}/{y}.png`
				],
				tileSize: 256,
				attribution: 'Copernicus Marine Service',
				maxzoom: 10,
				minzoom: 0,
				bounds: [11.4266, 41.0, 19.8429, 46.0640],
			},
			osm2: {
				type: 'raster',
				tiles: ['https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'],
				tileSize: 32,
				attribution: '© OpenStreetMap contributors',
				bounds: [11.0, 41, 13.5, 42.3]
			},
			},
			layers: [
			{ id: 'osm', type: 'raster', source: 'osm' },
			{ id: 'overlay', type: 'raster', source: 'overlay', paint: { 'raster-opacity': 0.7 } },
			{ id: 'osm2', type: 'raster', source: 'osm2' }
			]
		},
		center: [15.3, 44.5],
		zoom: 6
		});

		return () => map.remove();
	});

	$: if (map && date && mapMode) {
		const mapSource = map.getSource('overlay') as maplibregl.RasterTileSource;
		mapSource.setTiles([`/${mapMode}-tilemaps/${date}/{z}/{x}/{y}.png`]);
	}
</script>

<div class="config" style="background: {color_palette_light.primaryDark}">
	<h2>Map Settings</h2>
	<hr style="margin: 1rem 0; border: none; border-bottom: 1px solid #ccc; width: 18vw" />
	
	<lable>Map Mode:</lable>
	<select bind:value={mapMode}>
		<option value="sst">Sea Surface Temperature</option>
		<option value="chl">Chlorophyll-A Concentration</option>
		<option value="green">Chlorophyll from Greenalgae Concentration</option>
		<option value="so">Solinity at Sea Surface</option>
	</select>
</div>

<!-- Slider UI -->
<div class="slider-container">
  <div class="date-label">Date: {date}</div>
  <input
    type="range"
    min="0"
    max={availableDates.length - 1}
    bind:value={dateIndex}
    class="slider"
  />
</div>

<!-- Map Container -->
<div bind:this={mapContainer} class="map-container"></div>

<style>
	.map-container {
		position: absolute;
		top: 0; bottom: 0; left: 20vw; right: 0;
		width: 80vw;
	}

	.slider-container {
		position: absolute;
		top: 1rem;
		left: 25vw;
		right: 1rem;
		z-index: 10;
		background: #001021;
		padding: 0.6rem 1rem;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 70vw;
	}

  	.slider {
		width: 100%;	
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #ddd;
		border-radius: 3px;
		outline: none;
  	}

	.slider::-webkit-slider-runnable-track {
		height: 6px;
		background: #ddd;
		border-radius: 3px;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 18px;
		width: 18px;
		border-radius: 50%;
		background: #1481BA;
		border: 2px solid white;
		margin-top: -6px;
		cursor: pointer;
	}

	.slider::-moz-range-track {
		height: 6px;
		background: #ddd;
		border-radius: 3px;
	}

	.slider::-moz-range-thumb {
		height: 18px;
		width: 18px;
		border-radius: 50%;
		background: #1481BA;
		border: none;
		cursor: pointer;
	}

	.date-label {
		font-size: 14px;
		margin-bottom: 0.4rem;
		color: white;
	}

	.config {
		position: absolute;
		top: 0;
		left: 0;
		width: 20vw;
		height: 100vh;
		padding-top: 10vh;
		z-index: 0;
		padding-left: 1rem;
	}

	p {
		font-size: 1.1rem;
	}

	select {
		background-color: #001021;
		color: white;
		height: 4vh;
		border: solid 2px white;
		border-radius: 5px;
		max-width: 12vw;
	}

	select:focus {
		outline: none;
		box-shadow: none;
	}
</style>
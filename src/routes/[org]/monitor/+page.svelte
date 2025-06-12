<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
    import { color_palette_light } from '$lib/colors';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map;

	let slider: HTMLInputElement;

  // Available dates — every 5 days (manually list or fetch this)

    let availableDates: string[] = ["2024-05-20"];

   	let dateIndex = 0;
	$: date = availableDates[dateIndex];

	let mapMode = 'sst';

	let interval: ReturnType<typeof setInterval> | null = null;
	let playing = false;

	function startInterval() {
		if (interval) return;
		interval = setInterval(() => {
			dateIndex++;
			dateIndex %= availableDates.length;
		}, 100);
		playing = true;
	}

	function stopInterval() {
		if (interval) {
			clearInterval(interval);
			interval = null;
			playing = false;
		}
	}

	const updateAvailableDates = () => {
		let startDate = "2024-05-20";
		let endDate = "2025-05-20";
		let spacing = 5;

		let oldDate = date;

		fetch(`/api/tilemaps/${mapMode}-tilemaps`).then((res) => {
			res.json().then((data) => {
				startDate = data.first;
				endDate = data.last;
				spacing = data.spacing;
				
				availableDates = [];
				let current = new Date(startDate);

				while (current <= new Date(endDate)) {
					const yyyy = current.getFullYear();
					const mm = String(current.getMonth() + 1).padStart(2, '0');
					const dd = String(current.getDate()).padStart(2, '0');
					availableDates.push(`${yyyy}-${mm}-${dd}`);
					current.setDate(current.getDate() + spacing);
				}
				slider.max = `${availableDates.length - 1}`;

				let oldDateIndex = availableDates.findIndex(d => d === oldDate);
				if(oldDateIndex == -1) dateIndex = 0;
				else dateIndex = oldDateIndex;
			});
		});

	};

	onMount(() => {
		updateAvailableDates();
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
				`/api/tilemaps/${mapMode}-tilemaps/${date + (mapMode == 'sst'? 'T00-00': '')}/{z}/{x}/{y}.png`
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
		mapSource.setTiles([`/api/tilemaps/${mapMode}-tilemaps/${date + (mapMode == 'sst'? 'T00-00': '')}/{z}/{x}/{y}.png`]);
		updateAvailableDates();
	}
</script>

<div class="config" style="background: {color_palette_light.primaryDark}">
	<h2>Map Settings</h2>
	<hr style="margin: 1rem 0; border: none; border-bottom: 1px solid #ccc; width: 18vw" />
	
        <label>Map Mode:</label>
	<select bind:value={mapMode}>	
		<option value="sst">Sea Surface Temperature</option>
		<option value="chl">Chlorophyll-A Concentration</option>
		<option value="green">Chlorophyll from Greenalgae Concentration</option>
                <option value="so">Salinity at Sea Surface</option>
	</select>
</div>

<!-- Slider UI -->
<div class="slider-container">
	<div class="date-label">Date: {date}</div>
	<input
		type="range"
		min="0"
		bind:this={slider}
		bind:value={dateIndex}
		class="slider"
	/>

	<button style="color: {color_palette_light.primary}; border: solid {color_palette_light.primary} 2px" on:click={() => playing ? stopInterval() : startInterval()}>
		{#if playing}
			<FontAwesomeIcon icon={ faPause }/>
		{/if}

		{#if !playing}
			<FontAwesomeIcon icon={ faPlay }/>
		{/if}
	</button>



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

	.slider-container button {
		background: none;
		font-size: 1.5rem;
		padding: 0.5rem;
		aspect-ratio: 1;
		border-radius: 2rem;
		margin-top: 1vh;
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
/**
* ELDEN RING: Night Reign Stat Comparison Tool
* Handles data definition, Chart.js setup, UI controls (accordion, theme), and table generation.
*/

// --- Data Definition ---
const labels = ['HP', 'FP', 'スタミナ', '筋力', '技量', '知力', '信仰', '神秘'];

const characters = {
	'追跡者': {
		colorHex: '#607D8B',
		variants: [
			{ name: '遺物なし', data: [1120, 140, 102, 50, 40, 15, 15, 10] },
			{ name: '精神力上昇、生命力低下', data: [1020, 190, 102, 50, 40, 15, 15, 10] },
			{ name: '知力／進行上昇、筋力／技量低下', data: [1120, 140, 102, 43, 35, 30, 30, 10] },
			{ name: '二種重ね掛け', data: [1020, 190, 102, 43, 35, 30, 30, 10] }
		]
	},
	'守護者': {
		colorHex: '#D84315',
		variants: [
			{ name: '遺物なし', data: [1280, 115, 124, 41, 31, 10, 21, 10] },
			{ name: '筋力／技量上昇、生命力低下', data: [1120, 115, 124, 50, 50, 10, 21, 10] },
			{ name: '精神／信仰、生命力低下', data: [1160, 155, 124, 41, 31, 10, 38, 10] },
			{ name: '二種重ね掛け', data: [1000, 155, 124, 50, 50, 10, 38, 10] }
		]
	},
	'鉄の目': {
		colorHex: '#2E7D32',
		variants: [
			{ name: '遺物なし', data: [820, 115, 104, 19, 57, 7, 13, 13] },
			{ name: '生命力／筋力上昇、技量低下', data: [920, 115, 104, 39, 44, 7, 13, 13] },
			{ name: '神秘上昇、技量低下', data: [820, 115, 104, 19, 48, 7, 13, 28] },
			{ name: '二種重ね掛け', data: [920, 115, 104, 39, 35, 7, 13, 28] }
		]
	},
	'レディ': {
		colorHex: '#1565C0',
		variants: [
			{ name: '遺物なし', data: [860, 180, 84, 11, 45, 42, 27, 11] },
			{ name: '生命力／筋力上昇、精神力低下', data: [920, 110, 84, 35, 45, 42, 27, 11] },
			{ name: '精神力／信仰上昇、知力低下', data: [860, 195, 84, 11, 45, 37, 40, 11] },
			{ name: '二種重ね掛け', data: [920, 125, 84, 35, 45, 37, 40, 11] }
		]
	},
	'無頼漢': {
		colorHex: '#4E342E',
		variants: [
			{ name: '遺物なし', data: [1200, 95, 122, 68, 19, 3, 12, 10] },
			{ name: '精神力／知力上昇、生命力／持久力低下', data: [1040, 140, 114, 68, 19, 38, 12, 10] },
			{ name: '神秘上昇、生命力低下', data: [1120, 95, 122, 68, 19, 3, 12, 27] },
			{ name: '二種重ね掛け', data: [960, 140, 114, 68, 19, 38, 12, 27] }
		]
	},
	'復讐者': {
		colorHex: '#26C6DA',
		variants: [
			{ name: '遺物なし', data: [780, 200, 90, 21, 21, 30, 51, 12] },
			{ name: '生命力／持久力上昇、精神力低下', data: [880, 145, 100, 21, 21, 30, 51, 12] },
			{ name: '筋力上昇、信仰低下', data: [780, 200, 90, 46, 21, 30, 45, 12] },
			{ name: '二種重ね掛け', data: [880, 145, 100, 46, 21, 30, 45, 12] }
		]
	},
	'隠者': {
		colorHex: '#7B1FA2',
		variants: [
			{ name: '遺物なし', data: [740, 195, 94, 12, 19, 51, 51, 10] },
			{ name: '生命力／持久力／技量上昇、知力／信仰低下', data: [820, 195, 104, 12, 39, 41, 41, 10] },
			{ name: '知力／信仰上昇、精神力低下', data: [740, 130, 94, 12, 19, 63, 63, 10] },
			{ name: '二種重ね掛け', data: [820, 130, 104, 12, 39, 53, 53, 10] }
		]
	},
	'執行者': {
		colorHex: '#F9A825',
		variants: [
			{ name: '遺物なし', data: [1000, 100, 102, 25, 63, 8, 6, 28] },
			{ name: '生命力／持久力上昇、神秘低下', data: [1100, 100, 114, 25, 63, 8, 6, 15] },
			{ name: '技量／神秘上昇、生命力低下', data: [860, 100, 102, 25, 75, 8, 6, 37] },
			{ name: '二種重ね掛け', data: [960, 100, 114, 25, 75, 8, 6, 24] }
		]
	},
	'学者': {
		colorHex: '#C62828',
		variants: [
			{ name: '遺物なし', data: [900, 145, 98, 14, 18, 28, 15, 50] },
			{ name: '精神力上昇、生命力低下', data: [840, 190, 98, 14, 18, 28, 15, 50] },
			{ name: '持久力／技量上昇、知力／神秘低下', data: [900, 145, 110, 14, 55, 24, 15, 30] },
			{ name: '二種重ね掛け', data: [840, 190, 110, 14, 55, 24, 15, 30] }
		]
	},
	'葬儀屋': {
		colorHex: '#9E619C',
		variants: [
			{ name: '遺物なし', data: [1040, 115, 92, 50, 13, 5, 41, 10] },
			{ name: '技量上昇、生命力／信仰低下', data: [940, 115, 92, 50, 29, 5, 28, 10] },
			{ name: '精神力／信仰上昇、筋力低下', data: [1040, 160, 92, 35, 13, 5, 50, 10] },
			{ name: '二種重ね掛け', data: [940, 160, 92, 35, 29, 5, 37, 10] }
		]
	}
};

// State variables
let selectedIndices = {};
let chartInstance = null;
let accordionState = {};

// --- Helper Functions ---

function hexToRgba(hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getBorderAndBgColor(hex) {
	return {
		borderColor: hex,
		baseBgColor: hexToRgba(hex, 0.8)
	};
}

function createPattern(color, shapeType) {
	if (shapeType === 'solid') return color;

	const patternCanvas = document.createElement('canvas');
	const patternCtx = patternCanvas.getContext('2d');

	let size = 10;
	let lineWidth = 1;

	if (shapeType === 'horizontal') { // Changed to horizontal
		size = 4;
		lineWidth = 1;
	} else if (shapeType === 'dot') {
		size = 7;
	} else if (shapeType === 'cross') {
		size = 10;
		lineWidth = 1;
	}

	patternCanvas.width = size;
	patternCanvas.height = size;

	// Background (semi-transparent base color)
	const bgColor = hexToRgba(color, 0.2);
	patternCtx.fillStyle = bgColor;
	patternCtx.fillRect(0, 0, size, size);

	// Pattern Settings
	patternCtx.strokeStyle = color;
	patternCtx.fillStyle = color;
	patternCtx.lineWidth = lineWidth;

	switch (shapeType) {
		case 'horizontal': // 横線 (Horizontal Stripe)
		patternCtx.beginPath();
		patternCtx.moveTo(0, size / 2);
		patternCtx.lineTo(size, size / 2);
		patternCtx.stroke();
		break;
		case 'dot':
		const r = 1;
		patternCtx.beginPath();
		patternCtx.arc(size * 0.25, size * 0.25, r, 0, 2 * Math.PI);
		patternCtx.fill();
		patternCtx.beginPath();
		patternCtx.arc(size * 0.75, size * 0.75, r, 0, 2 * Math.PI);
		patternCtx.fill();
		break;
		case 'cross':
		patternCtx.beginPath();
		patternCtx.moveTo(0, 0);
		patternCtx.lineTo(size, size);
		patternCtx.moveTo(size, 0);
		patternCtx.lineTo(0, size);
		patternCtx.stroke();
		break;
	}
	return patternCtx.createPattern(patternCanvas, 'repeat');
}

function getActiveDatasets() {
	const datasets = [];

	Object.keys(characters).forEach(charName => {
		const charObj = characters[charName];
		const { borderColor, baseBgColor } = getBorderAndBgColor(charObj.colorHex);

		charObj.variants.forEach((variant, idx) => {
			const uniqueId = `${charName}-${idx}`;
			if (selectedIndices[uniqueId]) {

				let patternType = 'solid';
				if (idx === 1) patternType = 'horizontal'; // Changed 'vertical' to 'horizontal'
				else if (idx === 2) patternType = 'dot';
				else if (idx >= 3) patternType = 'cross';

				const bgPattern = createPattern(charObj.colorHex, patternType);

				datasets.push({
					label: `[${charName.charAt(0)}] ${variant.name}`,
					data: variant.data,
					backgroundColor: patternType === 'solid' ? baseBgColor : bgPattern,
					borderColor: borderColor,
					borderWidth: 2,
					datalabels: {
						color: document.documentElement.classList.contains('dark') ? '#fff' : '#1f2937',
						anchor: 'end',
						align: 'end',
						offset: 4,
						font: { weight: 'bold', size: 11 },
						formatter: Math.round
					}
				});
			}
		});
	});
	return datasets;
}

// --- UI Functions ---

function toggleAccordion(id, charName) {
	const content = document.getElementById(id);
	const arrow = document.getElementById(id + '-arrow');

	const isCollapsed = content.classList.contains('collapsed');

	if (isCollapsed) {
		content.classList.remove('collapsed');
		arrow.classList.remove('collapsed');
		accordionState[charName] = true;
	} else {
		content.classList.add('collapsed');
		arrow.classList.add('collapsed');
		accordionState[charName] = false;
	}
}

function toggleTheme() {
	const html = document.documentElement;
	if (html.classList.contains('dark')) {
		html.classList.remove('dark');
	} else {
		html.classList.add('dark');
	}
	if (chartInstance) {
		updateChart();
	}
	updateTable();
}

function deselectAll() {
	Object.keys(characters).forEach(charName => {
		characters[charName].variants.forEach((_, idx) => {
			const uniqueId = `${charName}-${idx}`;
			selectedIndices[uniqueId] = false;
		});
	});
	const checkboxes = document.querySelectorAll('#controlPanel input[type="checkbox"]');
	checkboxes.forEach(cb => cb.checked = false);
	updateChartAndTable();
}

// --- Download Chart Function ---

function downloadChartImage() {
	if (!chartInstance) return;

	// 1. Create a temporary canvas with exact same dimensions
	const originalCanvas = chartInstance.canvas;
	const originalWidth = originalCanvas.width;
	const originalHeight = originalCanvas.height;

	// Define padding size
	const padding = 40;

	const tempCanvas = document.createElement('canvas');
	const width = originalWidth + (padding * 2);
	const height = originalHeight + (padding * 2);

	tempCanvas.width = width;
	tempCanvas.height = height;
	const ctx = tempCanvas.getContext('2d');

	// 2. Fill Background based on current theme
	const isDark = document.documentElement.classList.contains('dark');
	const bgColor = isDark ? '#111827' : '#ffffff';
	const textColor = isDark ? '#9ca3af' : '#6b7280';

	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, width, height);

	// 3. Draw Chart centered with padding
	ctx.drawImage(originalCanvas, padding, padding);

	// 4. Add Text (Watermark) - Top Center position
	const text = 'ER:NR ステータス変更遺物効果比較ツール - https://fromatom.me/NIGHTREIGN-Relic-Stat-Analyzer/';
	const fontSize = Math.min(Math.max(12, Math.round(width * 0.015)), 24);
	ctx.font = `${fontSize}px sans-serif`;
	ctx.fillStyle = textColor;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';

	// Place text in the top padding area (top-center)
	ctx.fillText(text, width / 2, padding / 2);

	// 5. Download Process
	tempCanvas.toBlob((blob) => {
		if (!blob) {
			console.error('Blobの生成に失敗しました');
			return;
		}

		// Blob URL（一時的なURL）を生成
		const url = URL.createObjectURL(blob);

		// 一時的なリンク要素を作成
		const link = document.createElement('a');
		link.href = url;
		link.download = 'status_comparison_chart.png';

		// DOMに追加（Firefoxなどで必須）
		document.body.appendChild(link);

		// クリックイベントを強制発火
		link.click();

		// 後始末（DOMから削除し、メモリを開放）
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}, 'image/png');
}

// --- Rendering ---

function initControls() {
	const panel = document.getElementById('controlPanel');
	panel.innerHTML = '';

	Object.keys(characters).forEach((charName, index) => {
		const charObj = characters[charName];
		const accordionId = `acc-${index}`;

		if (accordionState[charName] === undefined) {
			accordionState[charName] = true;
		}

		const group = document.createElement('div');
		group.className = "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm transition-colors duration-300";

		const header = document.createElement('div');
		header.className = "p-3 bg-gray-50 dark:bg-gray-750 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors";
		header.onclick = () => toggleAccordion(accordionId, charName);

		const titleDiv = document.createElement('div');
		titleDiv.className = "flex items-center gap-2";
		titleDiv.innerHTML = `<span class="w-3 h-3 rounded-full shadow" style="background-color: ${charObj.colorHex}"></span>
                                      <span class="font-bold text-sm text-gray-700 dark:text-gray-200">${charName}</span>`;

		const arrow = document.createElement('div');
		arrow.id = accordionId + '-arrow';
		arrow.className = `arrow-icon text-gray-400 dark:text-gray-500 ${!accordionState[charName] ? 'collapsed' : ''}`;
		arrow.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;

		header.appendChild(titleDiv);
		header.appendChild(arrow);
		group.appendChild(header);

		const content = document.createElement('div');
		content.id = accordionId;
		content.className = `accordion-content bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 ${!accordionState[charName] ? 'collapsed' : ''}`;

		const grid = document.createElement('div');
		grid.className = "p-2 grid grid-cols-1 gap-1";

		charObj.variants.forEach((variant, idx) => {
			const uniqueId = `${charName}-${idx}`;

			if (selectedIndices[uniqueId] === undefined) {
				selectedIndices[uniqueId] = (idx === 0);
			}

			const label = document.createElement('label');
			label.className = "flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors";

			const checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.className = "form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 focus:ring-blue-500";
			checkbox.checked = selectedIndices[uniqueId];

			checkbox.onchange = (e) => {
				selectedIndices[uniqueId] = e.target.checked;
				updateChartAndTable();
			};

			const span = document.createElement('span');
			span.className = "text-xs text-gray-700 dark:text-gray-300 select-none flex items-center gap-2 truncate";

			let patternIcon = '';
			if (idx === 0) patternIcon = 'bg-current';
			else if (idx === 1) patternIcon = 'bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDRMOCA0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=\')]'; // Horizontal Line SVG
			else if (idx === 2) patternIcon = 'bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjxjaXJjbGUgY3g9IjYiIGN5PSI2IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==\')]';
			else patternIcon = 'bg-[url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBMOCA4TTggMEwwIDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==\')]';

			const iconColor = charObj.colorHex;

			span.innerHTML = `<span class="w-4 h-4 inline-block border border-gray-300 dark:border-gray-500 rounded-sm flex-shrink-0 ${patternIcon} bg-center bg-repeat" style="background-color: ${iconColor}; background-size: ${idx===0?'auto':'6px 6px'};"></span>${variant.name}`;

			label.appendChild(checkbox);
			label.appendChild(span);
			grid.appendChild(label);
		});

		content.appendChild(grid);
		group.appendChild(content);
		panel.appendChild(group);
	});
}

function updateTable() {
	const theadRow = document.getElementById('tableHeaderRow');
	const tbody = document.getElementById('dataTableBody');

	theadRow.innerHTML = '';
	tbody.innerHTML = '';

	const isDark = document.documentElement.classList.contains('dark');
	const headerBg = isDark ? 'bg-gray-700' : 'bg-gray-200';
	const cellBorder = isDark ? 'border-gray-700' : 'border-gray-200';
	const fixedBorderColor = isDark ? 'dark:border-gray-600' : 'border-gray-300';
	const fixedCellShadow = 'shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]';

	let th = document.createElement('th');
	th.scope = "col";
	th.className = `px-4 py-3 sticky left-0 z-20 min-w-[80px] border-b border-r ${fixedBorderColor} ${headerBg} ${fixedCellShadow}`;
	th.innerText = "項目";
	theadRow.appendChild(th);

	const activeDatasets = getActiveDatasets();

	if (activeDatasets.length === 0) {
		tbody.innerHTML = `<tr><td colspan="100%" class="p-4 text-center text-gray-500 border-b ${cellBorder}">データが選択されていません</td></tr>`;
		return;
	}

	activeDatasets.forEach((ds, i) => {
		const th = document.createElement('th');
		th.scope = "col";
		th.className = `px-4 py-3 min-w-[120px] border-b ${fixedBorderColor}`;
		th.style.color = ds.borderColor;
		th.innerText = ds.label;
		theadRow.appendChild(th);
	});

	labels.forEach((label, rowIndex) => {
		const tr = document.createElement('tr');
		const baseBg = rowIndex % 2 === 0
		? 'bg-white dark:bg-gray-800'
		: 'bg-gray-50 dark:bg-gray-750';
		const hoverBg = 'hover:bg-gray-100 dark:hover:bg-gray-700';

		tr.className = `${baseBg} ${hoverBg} group transition-colors`;

		let th = document.createElement('th');
		th.scope = "row";
		th.className = `px-4 py-3 font-medium text-gray-800 dark:text-white sticky left-0 z-10 border-b border-r ${fixedBorderColor} ${fixedCellShadow} ${baseBg} group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors`;
		th.innerText = label;
		tr.appendChild(th);

		activeDatasets.forEach(ds => {
			const val = ds.data[rowIndex];
			const td = document.createElement('td');
			td.className = `px-4 py-3 text-center border-b ${cellBorder}`;
			td.innerText = val;
			tr.appendChild(td);
		});

		tbody.appendChild(tr);
	});
}

function updateChart() {
	const ctx = document.getElementById('statusChart').getContext('2d');
	const datasets = getActiveDatasets();
	const isDark = document.documentElement.classList.contains('dark');

	const tickColor = isDark ? '#e5e7eb' : '#374151';
	const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

	if (chartInstance) {
		chartInstance.data.datasets = datasets;
		chartInstance.options.scales.x.ticks.color = tickColor;
		chartInstance.options.scales.x.grid.color = gridColor;
		chartInstance.options.scales.y.ticks.color = tickColor;

		chartInstance.data.datasets.forEach(ds => {
			ds.datalabels.color = isDark ? '#fff' : '#1f2937';
		});

		chartInstance.update();
	} else {
		chartInstance = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: datasets
			},
			plugins: [ChartDataLabels],
			options: {
				indexAxis: 'y',
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: { right: 50 }
				},
				scales: {
					x: {
						beginAtZero: true,
						grid: { color: gridColor },
						ticks: { color: tickColor }
					},
					y: {
						grid: { display: false },
						ticks: {
							color: tickColor,
							font: { size: 14, weight: 'bold' }
						}
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						align: 'start',
						labels: {
							color: tickColor,
							font: { size: 12 },
							boxWidth: 12,
							padding: 15
						},
						onClick: null
					},
					tooltip: {
						enabled: false
					}
				},
				interaction: {
					mode: 'nearest',
					axis: 'y',
					intersect: false
				}
			}
		});
	}
}

function updateChartAndTable() {
	updateChart();
	updateTable();
}

function updateAll() {
	initControls();
	updateChartAndTable();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
	updateAll();
});
var Minecraft = {};
Minecraft.toolSelected = '';

// creating my matrix
Minecraft.matrix = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1', '1', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '2', '2', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '2', '2', '2', '2', '2', '2', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '2', '2', '2', '2', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '2', '2', '2', '2', '2', '2', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '3', '2', '0', '0', '0'],
    ['0', '0', '0', '6', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '3', '0', '0', '0', '0'],
    ['0', '0', '0', '6', '6', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '3', '0', '0', '0', '0'],
    ['0', '0', '0', '6', '6', '0', '0', '0', '3', '0', '0', '6', '6', '0', '0', '3', '0', '0', '0', '0'],
    ['4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'],
    ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
    ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
    ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5'],
    ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '5']
]

// defining my cells
Minecraft.cells = {
    '6': { class: 'rock', data: 'pickaxe' },
    '5': { class: 'dirt', data: 'shovel' },
    '4': { class: 'grass', data: 'shovel' },
    '3': { class: 'tree', data: 'axe' },
    '2': { class: 'leaf', data: 'axe' },
    '1': { class: 'cloud', data: 'none' },
    '0': { class: 'sky', data: 'none' },

};

// creating tools
Minecraft.tools = [
    { data: 'shovel', src: 'images/shovel.png' },
    { data: 'axe', src: 'images/axe.png' },
    { data: 'pickaxe', src: 'images/pickaxe.png' }
];

// creating inventory
Minecraft.inventory = {
    dirt: 5,
    grass: 5,
    leaf: 5,
    tree: 5,
    rock: 5,
};

Minecraft.init = function () {
    Minecraft.grid();
    Minecraft.ToolBar();
    Minecraft.updateInventory();
};

// creating the grid based on matrix
Minecraft.grid = function () {
    let main = $('#main');
    for (let i = 0; i < Minecraft.matrix.length; i++) {
        for (let j = 0; j < Minecraft.matrix[i].length; j++) {
            let tile = $('<div>');
            tile.addClass(Minecraft.cells[Minecraft.matrix[i][j]].class)
                .addClass('box')
                .attr('data', Minecraft.cells[Minecraft.matrix[i][j]].data)
                .click(Minecraft.clickCell);
            main.append(tile);
        }
    }
};

// creates toolbar
Minecraft.ToolBar = function () {
    let toolArray = $(".toolItem");
    for (let i = 0; i < toolArray.length; i++) {
        toolArray.eq(i).append("<img src=" + Minecraft.tools[i].src + ">");
        toolArray.eq(i).attr('data', Minecraft.tools[i].data);
        toolArray.eq(i).click(Minecraft.clickTool);
    }
    $('.inventory.dirt').click(Minecraft.clickDirt);
    $('.inventory.grass').click(Minecraft.clickGrass);
    $('.inventory.leaf').click(Minecraft.clickLeaf);
    $('.inventory.rock').click(Minecraft.clickRock);
    $('.inventory.tree').click(Minecraft.clickTree);
};

Minecraft.clickTool = function () {
    Minecraft.replace = false;
    $('.toolItem').removeClass('toolSelected');
    $(this).toggleClass('toolSelected');
};

Minecraft.clickCell = function () {
    let selectedCell = $(this);
    Minecraft.checkMatch(selectedCell);
    console.log("works");
};

// check if the tool chosen can work on element
Minecraft.checkMatch = function (selectedCell) {
    if (Minecraft.replace === false) {
        let cellClass = selectedCell.attr('class').replace(" box", "");
        let inventoryName = "Minecraft.inventory." + cellClass;
        if (inventoryName === "Minecraft.inventory.dirt") {
            Minecraft.inventory.dirt += 1;
            Minecraft.updateInventory();
        }
        else if (inventoryName === "Minecraft.inventory.grass") {
            Minecraft.inventory.grass += 1;
            Minecraft.updateInventory();
        }
        else if (inventoryName === "Minecraft.inventory.leaf") {
            Minecraft.inventory.leaf += 1;
            Minecraft.updateInventory();
        }
        else if (inventoryName === "Minecraft.inventory.rock") {
            Minecraft.inventory.rock += 1;
            Minecraft.updateInventory();
        }
        else if (inventoryName === "Minecraft.inventory.tree") {
            Minecraft.inventory.tree += 1;
            Minecraft.updateInventory();
        }

        if (selectedCell.attr('data') === $('.toolSelected').attr('data')) {
            Minecraft.cellMover(selectedCell);
        }
        else {
            Minecraft.incompatible();
        }
    }
};

Minecraft.incompatible = function () {
    $('toolSelected').addClass('incorrect');
    setTimeout(function () {
        $('toolSelected').removeClass('incorrect');
    }, 200)
};

// changes cell to sky
Minecraft.cellMover = function (selectedCell) {
    if (selectedCell.not('sky box')) {
        selectedCell.attr('class', 'sky box');
    }
};

// adds cell from inventory
Minecraft.cellAdder = function () {
    var selectedCell = $(this);
    selectedCell.attr('class', Minecraft.newClass);
    selectedCell.attr('data', Minecraft.newData);
    $('.box').unbind('click', Minecraft.cellAdder);
};



// updates inventory
Minecraft.updateInventory = function () {
    var dirt = $('#dirtInventory');
    var grass = $('#grassInventory');
    var tree = $('#treeInventory');
    var leaf = $('#leafInventory');
    var rock = $('#rockInventory');
    dirt.html(Minecraft.inventory.dirt);
    grass.html(Minecraft.inventory.grass);
    tree.html(Minecraft.inventory.tree);
    leaf.html(Minecraft.inventory.leaf);
    rock.html(Minecraft.inventory.rock);
};

Minecraft.clickDirt = function () {
    if (Minecraft.inventory.dirt > 0) {
        Minecraft.inventory.dirt -= 1;
        Minecraft.newData = null;
        Minecraft.newClass = null;
        Minecraft.newClass = "dirt box";
        Minecraft.newData = "shovel";
        $('.box').not('inventory').click(Minecraft.cellAdder);
    }
    Minecraft.updateInventory()
};

Minecraft.clickGrass = function () {
    if (Minecraft.inventory.grass > 0) {
        Minecraft.inventory.grass -= 1;
        Minecraft.newData = null;
        Minecraft.newClass = null;
        Minecraft.newClass = "grass box";
        Minecraft.newData = "shovel";
        $('.box').not('inventory').click(Minecraft.cellAdder);
    }
    Minecraft.updateInventory()
};

Minecraft.clickLeaf = function () {
    if (Minecraft.inventory.leaf > 0) {
        Minecraft.inventory.leaf -= 1;
        Minecraft.newData = null;
        Minecraft.newClass = null;
        Minecraft.newClass = "leaf box";
        Minecraft.newData = "axe";
        $('.box').not('inventory').click(Minecraft.cellAdder);
    }
    Minecraft.updateInventory()
};

Minecraft.clickTree = function () {
    if (Minecraft.inventory.tree > 0) {
        Minecraft.inventory.tree -= 1;
        Minecraft.newData = null;
        Minecraft.newClass = null;
        Minecraft.newClass = "tree box";
        Minecraft.newData = "axe";
        $('.box').not('inventory').click(Minecraft.cellAdder);
    }
    Minecraft.updateInventory()
};

Minecraft.clickRock = function () {
    if (Minecraft.inventory.rock > 0) {
        Minecraft.inventory.rock -= 1;
        Minecraft.newData = null;
        Minecraft.newClass = null;
        Minecraft.newClass = "rock box";
        Minecraft.newData = "pickaxe";
        $('.box').not('inventory').click(Minecraft.cellAdder);
    }
    Minecraft.updateInventory()
};

Minecraft.init();

// Modal with start and inventory
var MainModal = document.getElementById("MainModal");
var TutoModal = document.getElementById("TutoModal");
var game = document.getElementById("container");

function startGame() {
    MainModal.style.display = "none";
    game.style.display = "flex";
}

var btnStart = document.getElementById("btn-start");
btnStart.addEventListener("click", startGame);


function OpenTutorial() {
    MainModal.style.display = "none";
    TutoModal.style.display = "block";
}

var btnTuto = document.getElementById("btn-tutorial");
btnTuto.addEventListener("click", OpenTutorial);

function CloseTutorial() {
    TutoModal.style.display = "none";
    game.style.display = "flex";
}

var btnStart2 = document.getElementById("btn-start2");
btnStart2.addEventListener("click", CloseTutorial);

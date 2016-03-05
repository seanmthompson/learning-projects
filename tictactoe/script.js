(function($) {
    function Board(element) {
        var self = this;
        
        // set properties of game
        this.turn = 0;
        this.player = 'X';
        this.gameOver = false;
        this.$board = $(element);
        this.$winner = $('#winner');
        this.$newGame = $('#newGame');
        this.board = [];
        this.winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
        this.init();
        this.initEvents();
    }
    
    Board.prototype.init = function() {
        this.$table = this.$board.append('<table><tbody></tbody></table>');
        this.$tableBody = this.$table.find('tbody');
        
        // make the Board
        var counter = 0;
        for(var i = 0; i < 3; i++) {
            this.board.push('');
            var tr  = document.createElement('tr');
            for (var j = 0; j < 3; j++) {
                this.board.push('');
                var td = document.createElement('td');
                td.setAttribute('data-index', counter.toString());
                tr.appendChild(td);
                counter++;
            }
            this.$tableBody.append(tr);
        }
    }
    
    Board.prototype.initEvents = function() {
        var self = this;
        this.$tableBody.bind("click", self.addLetter.bind(self));
        this.$newGame.bind("click", self.newGame.bind(self));
    }
    
    Board.prototype.addLetter = function($event) {
        var self = this;
        if(this.checkBoxOpen($event)) {
            $event.target.textContent = this.player;
            var space = $event.target.getAttribute('data-index');
            this.board[space] = this.player;
            if(!this.checkWinner()) {
                this.increaseTurnCounter();
            } else {
                this.showWinner();
            }
            
        } else { 
            alert('That box already occupied');
        }
        this.player = this.player == 'X' ? 'O' : 'X';
    }
    
    Board.prototype.checkBoxOpen = function($event) {
        return $event.target.textContent == '';
    }
    
    Board.prototype.checkWinner = function() {
        var self = this;
        var winner = false;
        this.winCombinations.forEach(function(value, index) {
            if(allEqual.call(self, value)) {
                winner = true;
            }
        });
        return winner;
    }
    
    var allEqual = function( indexes ) {
        return ( this.board[ indexes[0] ] === this.board[ indexes[1] ] ) &&
            ( this.board[ indexes[0] ] === this.board[ indexes[2] ] ) &&
            ( this.board[ indexes[0] ] !== '' );
    };
    
    Board.prototype.increaseTurnCounter = function() {
        if(this.turn < 8) {
            this.turn++;
        } else {
            this.gameOver = true;
            this.$winner.css('display', 'block');
            this.$winner.find('p').text('Its a tie!');
        }
    }
    
    Board.prototype.showWinner = function() {
        this.gameOver = true;
        this.$winner.css('display', 'block');
        this.$winner.find('p').text('Player ' + this.player + ' has won!');
    }
    
    Board.prototype.newGame = function() {
        this.$winner.css('display', 'none');
        this.$board.empty();
        this.board = [];
        this.player = 'X';
        this.turn = 0;
        this.gameOver = false;
        this.init();
        this.initEvents();
    }
    
    window.Board = Board;
})(jQuery);
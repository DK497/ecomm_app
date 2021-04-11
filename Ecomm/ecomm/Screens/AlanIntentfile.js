intent('hello world', p => {
    p.play('(hi dhruv)');
});
intent('Open the menu', p => {
    p.play({"command": "hey dhruv", "screen": "menu"});
    p.play('Opening the menu');
});

intent('Go to sleep', p => {
    p.play({"command": "sleep"});
    
});

intent('Car1', p => {
   p.play('Car one');
    
});

intent('(Clear|Empty) (the|) cart', p => {
    p.play({"command": "clear"});
    p.play('Emptying the cart');
    
});

const itemName="$(ITEM_NAME Car 1|Car 2|Bike1|Cars 3|Chess|Chess1)"

intent(`Add ${itemName} (item|) to (the|) cart`, p => {
    p.play({"command": "add","item": p.ITEM_NAME.value});
    p.play(`Adding ${p.ITEM_NAME.value} to the cart`);
    
});

intent(`Remove ${itemName} (item|) from (the|) cart`, p => {
    p.play({"command": "remove","item": p.ITEM_NAME.value});
    p.play(`Removing ${p.ITEM_NAME.value} from the cart`);
    
});


question('what is this', p =>  {
    p.play('This is an example app with voice capabilities. (Powered by Alan|Voice support is provided by Alan)');
});

question('what is Alan (AI|Platform|)', p => {
    p.play('Alan (AI|Platform) is a platform that will allow you to voice enable any application. Be it mobile app on iOS or Android, or a web page.');
});


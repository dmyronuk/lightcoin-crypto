class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance(){
    return this.transactions.reduce((acc, cur) => {
      acc += cur.value;
      return acc;
    }, 0)
  }

  addTransaction(transaction){
    this.transactions.push(transaction);
  }
};

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  isAllowed(){
    //transaction is deposit
    if(this.value >=0){
      return true
    //transaction is withdrawal
    }else{
      return this.amount <= this.account.balance;
    }
  }

  commit() {
    if(this.isAllowed()){
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }else{
      return false;
    }
  }
};

class Deposit extends Transaction {
  get value(){
    return this.amount
  }
};

class Withdrawal extends Transaction {
  get value(){
    return -this.amount;
  }
};


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');
console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

const t3 = new Withdrawal(71.00, myAccount);
t3.commit();

console.log('Ending Balance:', myAccount.balance);


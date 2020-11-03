# Staking CLI Usage

## Clone Repository & Install Dependencies
To clone the repository and install dependencies, put the below commands on your terminal.
```sh
$ git clone https://github.com/Onther-Tech/tokamak-staking-lib.git
$ cd tokamak-staking-lib
$ npm install
```

Install typescript globally to compile the TypeScript code.
```sh
$ sudo npm install -g typescript
```

Install ts-node globally to run the TypeScript code.
```sh
$ sudo npm install -g ts-node
```

## Usage
To run the cli, put the below commands with options on your terminal.
```sh
$ ts-node cli.ts -n [net] -e [endpoint] -f [func] -p [param]
```

To display the cli options, put the help command on your terminal.
```sh
$ ts-node cli.ts --help
Usage: cli [options]

Options:
  -n, --net [value]       network name. e.g. mainnet / rinkeby
  -e, --endpoint [value]  web3 provider rpc endpoint
  -f, --func [value]      function name
  -p, --param [value]     function parameters splited by comma
  -h, --help              display help for command
```

## Examples
### [getNumLayer2](./api_reference.md#getNumLayer2)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839 \
    -f getNumLayer2
```

### [getLayer2ByIndex](./api_reference.md#getLayer2ByIndex)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839 \
    -f getLayer2ByIndex \
    -p 0
```

### [isLayer2](./api_reference.md#isLayer2)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839 \
    -f isLayer2 \
    -p 0xA10ae25583cA45d38b392aDe535a53B73dA142E7
```

### [getOperator](./api_reference.md#getOperator)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839 \
    -f getOperator \
    -p 0xA10ae25583cA45d38b392aDe535a53B73dA142E7
```

### [isSubmitter](./api_reference.md#isSubmitter)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839 \
    -f isSubmitter \
    -p "0xA10ae25583cA45d38b392aDe535a53B73dA142E7,0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39"
```

### [getStakedAmount](./api_reference.md#getStakedAmount)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://api.infura.io/v1/jsonrpc/rinkeby \
    -f getStakedAmount \
    -p "0xA10ae25583cA45d38b392aDe535a53B73dA142E7,0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39,latest"
```

### [getStakedAmountDiff](./api_reference.md#getStakedAmountDiff)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://api.infura.io/v1/jsonrpc/rinkeby \
    -f getStakedAmountDiff \
    -p "0xA10ae25583cA45d38b392aDe535a53B73dA142E7,0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39,7475257,7475258"
```

### [getTotalStakedAmount](./api_reference.md#getTotalStakedAmount)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://api.infura.io/v1/jsonrpc/rinkeby \
    -f getTotalStakedAmount \
    -p "0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39,latest"
```

### [getTotalStakedAmountDiff](./api_reference.md#getTotalStakedAmountDiff)
```sh
$ ts-node cli.ts \
    -n rinkeby \
    -e https://api.infura.io/v1/jsonrpc/rinkeby \
    -f getTotalStakedAmountDiff \
    -p "0xDf08F82De32B8d460adbE8D72043E3a7e25A3B39,7475257,7475258"
```

### [commitDummy](./api_reference.md#commitDummy)
```sh
$ ts-node cli.ts \
    -n rinkeby  \
    -e https://rinkeby.infura.io/v3/2d92b8fedd374147b0ec8a9fa04b2839  \
    -f commitDummy  \
    -p "0xA10ae25583cA45d38b392aDe535a53B73dA142E7,[private-key]"
```

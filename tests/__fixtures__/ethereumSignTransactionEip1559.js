import commonFixtures from '../../submodules/trezor-common/tests/fixtures/ethereum/sign_tx_eip1559.json';

export default {
    method: 'ethereumSignTransaction',
    setup: {
        mnemonic: commonFixtures.setup.mnemonic,
    },
    tests: commonFixtures.tests.flatMap(({ name, parameters, result }) => {
        const fixture = {
            description: `Eip1559 ${name} ${parameters.comment ?? ''}`,
            params: {
                path: `m/${parameters.path}`,
                transaction: {
                    to: parameters.to_address,
                    chainId: parameters.chain_id,
                    value: parameters.value.toString(16),
                    nonce: parameters.nonce.toString(16),
                    gasLimit: parameters.gas_limit.toString(16),
                    maxFeePerGas: parameters.max_gas_fee.toString(16),
                    maxPriorityFeePerGas: parameters.max_priority_fee.toString(16),
                },
            },
            result: {
                r: `0x${result.sig_r_hex}`,
                s: `0x${result.sig_s_hex}`,
                v: `0x${result.sig_v.toString(16)}`,
            },
        };

        if (parameters.data) {
            fixture.params.transaction.data = parameters.data;
        }

        if (parameters.value >= Number.MAX_SAFE_INTEGER) {
            fixture.params.transaction.value = '0xab54a98ceb1f0ad2'; // 12345678901234567890
        }

        return fixture;
    }),
};

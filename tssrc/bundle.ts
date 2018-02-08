/**
 * @file bundle.ts
 * @author denglingbo
 * 
 * 用于按需加载
 */

import * as React from 'react';

interface BundleProps {
    load: (props: any) => void,
    children: (mod: any) => JSX.Element,
}

interface BundleState {
    mod: any;
}

export default class Bundle extends React.Component<BundleProps, BundleState> {
    constructor(props: BundleProps) {
        super(props);

        this.state = {
            mod: null
        }
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps: BundleProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props: BundleProps) {
        this.setState({
            mod: null
        });

        props.load((mod: any) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        })
    }

    render() {
        if (!this.state.mod) {
            return false;
        }

        return this.props.children(this.state.mod);
    }
}

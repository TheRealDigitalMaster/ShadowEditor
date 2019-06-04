import './css/Timeline.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 时间轴
 * @author tengge / https://github.com/tengge1
 */
class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, style } = this.props;

        return <div className={classNames('Timeline', className)} style={style}>
            <canvas></canvas>
        </div>;
    }

    componentDidMount() {
        return;
        var duration = this.duration; // 持续秒数
        var scale = this.scale; // 1秒像素数
        var width = duration * scale; // 画布宽度
        var scale5 = scale / 5; // 0.2秒像素数
        var margin = 0; // 时间轴前后间距

        this.dom.style.width = (width + margin * 2) + 'px';
        this.dom.width = this.dom.clientWidth;

        var context = this.dom.getContext('2d');

        // 时间轴背景
        context.fillStyle = '#eee';
        context.fillRect(0, 0, this.dom.width, this.dom.height);

        // 时间轴刻度
        context.strokeStyle = '#555';
        context.beginPath();

        for (var i = margin; i <= width + margin; i += scale) { // 绘制每一秒
            for (var j = 0; j < 5; j++) { // 绘制每个小格
                if (j === 0) { // 长刻度
                    context.moveTo(i + scale5 * j, 22);
                    context.lineTo(i + scale5 * j, 30);
                } else { // 短刻度
                    context.moveTo(i + scale5 * j, 26);
                    context.lineTo(i + scale5 * j, 30);
                }
            }
        }

        context.stroke();

        // 时间轴文字
        context.font = '12px Arial';
        context.fillStyle = '#888'

        for (var i = 0; i <= duration; i += 2) { // 对于每两秒
            var minute = Math.floor(i / 60);
            var second = Math.floor(i % 60);

            var text = (minute > 0 ? minute + ':' : '') + ('0' + second).slice(-2);

            if (i === 0) {
                context.textAlign = 'left';
            } else if (i === duration) {
                context.textAlign = 'right';
            } else {
                context.textAlign = 'center';
            }

            context.fillText(text, margin + i * scale, 16);
        }
    }

    componentWillUnmount() {

    }
}

Timeline.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

export default Timeline;
import {
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons'
import React from 'react'

export default function SectionDropdown({ section, expanded, onToggle, children }) {
    return (
        <tr className="bg-gray-50 border-b border-gray-200 transition-colors duration-300">
            <td colSpan={children.props.colSpan} className="p-2 transition-colors duration-300">
                <button
                    className="flex items-center gap-2 font-semibold text-sm text-gray-700 w-full py-3 transition-colors duration-300 hover:bg-gray-100"
                    onClick={() => onToggle(section)}
                    style={{
                        transition: 'background 0.3s, color 0.3s',
                    }}
                >
                    <span className="transition-transform duration-300">
                        {expanded ? <UpOutlined /> : <DownOutlined />}
                    </span>
                    {children}
                </button>
            </td>
        </tr>
    )
}
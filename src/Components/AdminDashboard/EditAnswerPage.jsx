"use client"

import { useState, useRef, useEffect } from "react"
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link,
    ImageIcon,
    Code,
    MoreHorizontal,
    RotateCcw,
    RotateCw,
} from "lucide-react"

export default function EditAnswerPage() {
    const editorRef = useRef(null)
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    })

    const initialContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p>

<h1>Heading1</h1>

<h2>Heading2</h2>

<h3>Heading3</h3>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p>

<p><code>code textcode textcode textcode textcode text</code></p>

<ol>
<li>ordered list item</li>
<li>ordered list item</li>
<li>ordered list item</li>
<li>ordered list item</li>
</ol>

<p>Nothing is impossible, the word itself says "I'm possible!"</p>`

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = initialContent
        }
    }, [])

    const handleSave = () => {
        if (editorRef.current) {
            console.log("Save answer:", editorRef.current.innerHTML)
        }
    }

    const handleGetBack = () => {
        console.log("Get back clicked")
    }

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value)
        updateActiveFormats()
        editorRef.current?.focus()
    }

    const updateActiveFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            strikethrough: document.queryCommandState("strikeThrough"),
        })
    }

    const handleSelectionChange = () => {
        updateActiveFormats()
    }

    const handleKeyUp = () => {
        updateActiveFormats()
    }

    const handleMouseUp = () => {
        updateActiveFormats()
    }

    const insertHeading = (level) => {
        execCommand("formatBlock", `<h${level}>`)
    }

    const insertParagraph = () => {
        execCommand("formatBlock", "<p>")
    }

    return (
        <div className="min-h-screen p-6 mt-5">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs mb-6">
                <ul>
                    <li>
                        <a className="text-gray-500">Dashboard</a>
                    </li>
                    <li>
                        <a className="text-gray-500">FAQ</a>
                    </li>
                    <li className="text-gray-900">Edit answer</li>
                </ul>
            </div>

            {/* Question */}
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">
                    What skincare ingredients work best to prevent aging and wrinkles?
                </h1>
            </div>

            {/* Editor */}
            <div className="card bg-base-100 shadow-md border border-gray-200">
                <div className="card-body p-0 bg-white/50">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-3 border-b border-gray-200 flex-wrap ">
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("undo")}>
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("redo")}>
                            <RotateCw className="w-4 h-4" />
                        </button>

                        <div className="divider divider-horizontal mx-1"></div>

                        <select
                            className="select select-bordered select-sm w-32"
                            onChange={(e) => {
                                const value = e.target.value
                                if (value === "normal") insertParagraph()
                                else if (value === "h1") insertHeading(1)
                                else if (value === "h2") insertHeading(2)
                                else if (value === "h3") insertHeading(3)
                            }}
                        >
                            <option value="normal">Normal text</option>
                            <option value="h1">Heading 1</option>
                            <option value="h2">Heading 2</option>
                            <option value="h3">Heading 3</option>
                        </select>

                        <select
                            className="select select-bordered select-sm w-16"
                            onChange={(e) => execCommand("fontSize", e.target.value)}
                        >
                            <option value="1">10</option>
                            <option value="2">12</option>
                            <option value="3" selected>
                                14
                            </option>
                            <option value="4">16</option>
                            <option value="5">18</option>
                            <option value="6">24</option>
                            <option value="7">36</option>
                        </select>

                        <div className="divider divider-horizontal mx-1"></div>

                        <button
                            className={`btn btn-sm btn-square ${activeFormats.bold ? "btn-active bg-gray-200" : "btn-ghost"}`}
                            onClick={() => execCommand("bold")}
                        >
                            <Bold className="w-4 h-4" />
                        </button>
                        <button
                            className={`btn btn-sm btn-square ${activeFormats.italic ? "btn-active bg-gray-200" : "btn-ghost"}`}
                            onClick={() => execCommand("italic")}
                        >
                            <Italic className="w-4 h-4" />
                        </button>
                        <button
                            className={`btn btn-sm btn-square ${activeFormats.underline ? "btn-active bg-gray-200" : "btn-ghost"}`}
                            onClick={() => execCommand("underline")}
                        >
                            <Underline className="w-4 h-4" />
                        </button>
                        <button
                            className={`btn btn-sm btn-square ${activeFormats.strikethrough ? "btn-active bg-gray-200" : "btn-ghost"
                                }`}
                            onClick={() => execCommand("strikeThrough")}
                        >
                            <Strikethrough className="w-4 h-4" />
                        </button>

                        <div className="divider divider-horizontal mx-1"></div>

                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyLeft")}>
                            <AlignLeft className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyCenter")}>
                            <AlignCenter className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("justifyRight")}>
                            <AlignRight className="w-4 h-4" />
                        </button>

                        <div className="divider divider-horizontal mx-1"></div>

                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("insertUnorderedList")}>
                            <List className="w-4 h-4" />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square" onClick={() => execCommand("insertOrderedList")}>
                            <ListOrdered className="w-4 h-4" />
                        </button>

                        <div className="divider divider-horizontal mx-1"></div>

                        <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => {
                                const url = prompt("Enter URL:")
                                if (url) execCommand("createLink", url)
                            }}
                        >
                            <Link className="w-4 h-4" />
                        </button>
                        <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => {
                                const url = prompt("Enter image URL:")
                                if (url) execCommand("insertImage", url)
                            }}
                        >
                            <ImageIcon className="w-4 h-4" />
                        </button>
                        <button
                            className="btn btn-ghost btn-sm btn-square"
                            onClick={() => {
                                const selection = window.getSelection()
                                if (selection.rangeCount > 0) {
                                    const range = selection.getRangeAt(0)
                                    const code = document.createElement("code")
                                    code.appendChild(range.extractContents())
                                    range.insertNode(code)
                                }
                            }}
                        >
                            <Code className="w-4 h-4" />
                        </button>

                        <div className="divider divider-horizontal mx-1"></div>

                        <button className="btn btn-ghost btn-sm btn-square">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Editor Content */}
                    <div
                        style={{ height: 'calc(100vh - 500px)' }}  // ← Added spaces around the minus sign
                        className="p-6 overflow-auto"
                    >
                        <div
                            ref={editorRef}
                            contentEditable
                            className="min-h-[400px] outline-none prose prose-sm max-w-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-4"
                            onKeyUp={handleKeyUp}
                            onMouseUp={handleMouseUp}
                            onSelectionChange={handleSelectionChange}
                            style={{
                                lineHeight: "1.6",
                            }}
                        />
                    </div>

                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={handleGetBack} className="btn btn-ghost text-gray-600">
                    Get back
                </button>
                <button onClick={handleSave} className="btn bg-[#BB9777] text-white hover:bg-[#b18863]">
                    Save answer
                </button>
            </div>
        </div>
    )
}

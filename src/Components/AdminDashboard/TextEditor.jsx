"use client"
import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link, ImageIcon, Code, MoreHorizontal, RotateCcw, RotateCw } from 'lucide-react'

export default function TextEditor() {
    const editorRef = useRef(null)
    const fileInputRef = useRef(null)
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    })

    const initialContent = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p><h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla accumsan sodales ornare. At urna viverra non suspendisse neque, lorem. Pretium condimentum pellentesque gravida ut etiam sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus tincidunt aliquam.</p><p><code>code textcode textcode textcode textcode text</code></p><ol><li>ordered list item</li><li>ordered list item</li><li>ordered list item</li><li>ordered list item</li></ol><p>Nothing is impossible, the word itself says "I'm possible!"</p>`

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

    // Handle image upload from desktop
    const handleImageUpload = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageUrl = e.target.result
                insertImageIntoEditor(imageUrl)
            }
            reader.readAsDataURL(file)
        } else {
            alert('Please select a valid image file.')
        }
        // Reset the input value so the same file can be selected again
        event.target.value = ''
    }

    const insertImageIntoEditor = (imageUrl) => {
        const selection = window.getSelection()
        if (selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)

        // Create a container div for the image
        const imageContainer = document.createElement('div')
        imageContainer.style.textAlign = 'center'
        imageContainer.style.margin = '20px 0'
        imageContainer.style.width = '100%'
        imageContainer.style.display = 'block'

        // Create the image element
        const img = document.createElement('img')
        img.src = imageUrl
        img.style.maxWidth = '30%'  // Set to 40% of text field width
        img.style.height = 'auto'
        img.style.borderRadius = '8px'
        img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
        img.style.display = 'block'  // Ensure proper centering
        img.style.margin = '0 auto'  // Center the image within the container
        img.alt = 'Uploaded image'

        // Add the image to the container
        imageContainer.appendChild(img)

        // Check if we're inside a paragraph or other element
        let currentNode = range.startContainer
        let parentElement = currentNode.nodeType === Node.TEXT_NODE ? currentNode.parentNode : currentNode

        // Find the closest block-level parent (p, div, h1, etc.)
        while (parentElement && parentElement !== editorRef.current) {
            const tagName = parentElement.tagName?.toLowerCase()
            if (['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li'].includes(tagName)) {
                break
            }
            parentElement = parentElement.parentNode
        }

        if (parentElement && parentElement !== editorRef.current) {
            // If we're inside a block element, insert after it
            parentElement.parentNode.insertBefore(imageContainer, parentElement.nextSibling)
        } else {
            // If we're at the root level, insert at cursor position
            range.deleteContents()
            range.insertNode(imageContainer)
        }

        // Create a new paragraph after the image for continued typing
        const newParagraph = document.createElement('p')
        newParagraph.innerHTML = '<br>' // Add a line break to make it visible
        imageContainer.parentNode.insertBefore(newParagraph, imageContainer.nextSibling)

        // Set cursor in the new paragraph
        const newRange = document.createRange()
        newRange.setStart(newParagraph, 0)
        newRange.setEnd(newParagraph, 0)
        selection.removeAllRanges()
        selection.addRange(newRange)

        editorRef.current?.focus()
    }

    const insertImageFromUrl = () => {
        const url = prompt("Enter image URL:")
        if (url) {
            insertImageIntoEditor(url)
        }
    }

    return (
        <div className="min-h-screen ">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Editor */}
            <div className="card bg-base-100 shadow-md border border-gray-200 ">
                <div
                    style={{ height: 'calc(100vh - 350px)', overflow: 'auto' }}
                    className="card-body p-0 bg-white/50 ">
                    {/* Toolbar */}
                    <div className="sticky top-0 flex items-center gap-1 p-3 border-b border-gray-200 flex-wrap bg-white">
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
                            <option value="3" defaultValue>
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

                        {/* Image Upload Dropdown */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-square">
                                <ImageIcon className="w-4 h-4" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <a onClick={handleImageUpload}>
                                        <ImageIcon className="w-4 h-4" />
                                        Upload from device
                                    </a>
                                </li>
                                <li>
                                    <a onClick={insertImageFromUrl}>
                                        <Link className="w-4 h-4" />
                                        Insert from URL
                                    </a>
                                </li>
                            </ul>
                        </div>

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
                        style={{ height: 'calc(100vh - 500px)' }}
                        className="p-6 "
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
        </div>
    )
}
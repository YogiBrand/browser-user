import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Bot, Workflow, Database, Settings, Play, Pause, Square, Plus, Upload, Globe, Mail, User, Building, ChevronRight, ChevronDown, ChevronLeft, RefreshCw, Save, Link, Search, Filter, Download, Trash2, Edit, Eye, EyeOff, CheckCircle, AlertCircle, Clock, Camera, MousePointer, Keyboard, FileText, Shield, Zap, Terminal, Code, Copy, Check, X, Info, Sliders, Brain, Cpu, Activity, BarChart } from 'lucide-react';

// Main Application Component
const BrowserAutomationTool = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [browserUrl, setBrowserUrl] = useState('https://example.com');
  const [isRecording, setIsRecording] = useState(false);
  const [agents, setAgents] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [dataRecords, setDataRecords] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('default');
  
  // Browser-use specific state
  const [browserConfig, setBrowserConfig] = useState({
    provider: 'openrouter',
    model: 'openai/gpt-4o',
    apiKey: '',
    baseUrl: 'https://openrouter.ai/api/v1',
    temperature: 0.6,
    maxSteps: 100,
    maxActionsPerStep: 10,
    useVision: true,
    enableScreenshot: true,
    toolCallingMethod: 'auto'
  });

  const [profiles, setProfiles] = useState({
    default: {
      // Personal Information
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      
      // Address Information
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      
      // Company Information
      companyName: '',
      jobTitle: '',
      department: '',
      companyWebsite: '',
      companyPhone: '',
      
      // Social Media
      linkedin: '',
      twitter: '',
      github: '',
      
      // Additional Fields
      bio: '',
      interests: '',
      skills: '',
      
      // Payment Information (encrypted)
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      billingAddress: ''
    }
  });

  // Sidebar Component
  const Sidebar = () => {
    const tabs = [
      { id: 'chat', icon: MessageSquare, label: 'Chat & Control' },
      { id: 'agents', icon: Bot, label: 'Agents' },
      { id: 'workflows', icon: Workflow, label: 'Workflows' },
      { id: 'data', icon: Database, label: 'Data' },
      { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    return (
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-lg transition-all duration-200 relative group ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <tab.icon size={24} />
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // Enhanced Chat Interface with Browser-Use Controls
  const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [isAgentActive, setIsAgentActive] = useState(false);
    const [browserUseMode, setBrowserUseMode] = useState('auto');
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
      if (input.trim()) {
        setMessages([...messages, { 
          id: Date.now(), 
          text: input, 
          sender: 'user', 
          timestamp: new Date() 
        }]);
        setInput('');
        
        // Simulate browser-use agent response
        if (isAgentActive) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: Date.now() + 1,
              text: `🤖 Browser Agent: Executing task: "${input}"`,
              sender: 'agent',
              timestamp: new Date(),
              type: 'browser-action'
            }]);
          }, 1000);
        }
      }
    };

    return (
      <div className="flex flex-col h-full">
        {/* Browser-Use Control Panel */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Browser Automation Control</h3>
            <button
              onClick={() => setIsAgentActive(!isAgentActive)}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                isAgentActive 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              <Brain size={16} />
              <span>{isAgentActive ? 'Agent Active' : 'Agent Inactive'}</span>
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2">
              <Camera size={16} />
              <span className="text-sm">Screenshot</span>
            </button>
            <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2">
              <MousePointer size={16} />
              <span className="text-sm">Click</span>
            </button>
            <button className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2">
              <Keyboard size={16} />
              <span className="text-sm">Type</span>
            </button>
          </div>
          
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm text-gray-400">Mode:</span>
            <select
              value={browserUseMode}
              onChange={(e) => setBrowserUseMode(e.target.value)}
              className="px-3 py-1 bg-gray-700 text-white rounded text-sm"
            >
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
              <option value="guided">Guided</option>
            </select>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : msg.type === 'browser-action'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={isAgentActive ? "Tell the agent what to do..." : "Type your message..."}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Active Tasks with Browser-Use Status
  const ActiveTasks = () => {
    const [expandedTasks, setExpandedTasks] = useState({});

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Active Browser Tasks</h3>
          <span className="text-xs text-gray-400">Browser-Use Engine</span>
        </div>
        <div className="space-y-2">
          {activeTasks.length === 0 ? (
            <p className="text-gray-400">No active browser tasks</p>
          ) : (
            activeTasks.map((task) => (
              <div key={task.id} className="bg-gray-700 rounded-lg p-3">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedTasks({...expandedTasks, [task.id]: !expandedTasks[task.id]})}
                >
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />
                    <span className="text-white">{task.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{task.steps} steps</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-400 transition-transform ${
                        expandedTasks[task.id] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                
                {expandedTasks[task.id] && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-gray-400">
                      Current Action: {task.currentAction}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Pause size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Square size={16} />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-2">
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Enhanced Settings Panel with Browser-Use Configuration
  const SettingsPanel = () => {
    const [activeSection, setActiveSection] = useState('browser-use');
    const [savedConfigs, setSavedConfigs] = useState([]);
    const [showApiKey, setShowApiKey] = useState(false);

    const providers = [
      { value: 'openrouter', label: 'OpenRouter' },
      { value: 'openai', label: 'OpenAI' },
      { value: 'anthropic', label: 'Anthropic' },
      { value: 'groq', label: 'Groq' },
      { value: 'ollama', label: 'Ollama (Local)' }
    ];

    const models = {
      openrouter: [
        'openai/gpt-4o',
        'anthropic/claude-3-opus',
        'google/gemini-pro',
        'meta-llama/llama-3-70b'
      ],
      openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      groq: ['llama3-70b', 'mixtral-8x7b'],
      ollama: ['llama3', 'mistral', 'phi3']
    };

    return (
      <div className="h-full flex">
        <div className="w-56 bg-gray-800 p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">Settings</h3>
          <nav className="space-y-2">
            {[
              { id: 'browser-use', label: 'Browser-Use Config', icon: Brain },
              { id: 'profiles', label: 'Form Profiles', icon: FileText },
              { id: 'credentials', label: 'Website Credentials', icon: Shield },
              { id: 'integrations', label: 'Integrations', icon: Zap },
              { id: 'advanced', label: 'Advanced', icon: Sliders }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeSection === section.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <section.icon size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === 'browser-use' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Browser-Use Configuration</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Save size={16} />
                  <span>Save Config</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* LLM Provider Section */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">LLM Provider Settings</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Provider</label>
                      <select
                        value={browserConfig.provider}
                        onChange={(e) => setBrowserConfig({...browserConfig, provider: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      >
                        {providers.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Model</label>
                      <select
                        value={browserConfig.model}
                        onChange={(e) => setBrowserConfig({...browserConfig, model: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      >
                        {models[browserConfig.provider]?.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-gray-300 mb-2">API Key</label>
                    <div className="flex space-x-2">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={browserConfig.apiKey}
                        onChange={(e) => setBrowserConfig({...browserConfig, apiKey: e.target.value})}
                        className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="Enter your API key"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                      >
                        {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-gray-300 mb-2">Base URL</label>
                    <input
                      type="text"
                      value={browserConfig.baseUrl}
                      onChange={(e) => setBrowserConfig({...browserConfig, baseUrl: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm text-gray-300 mb-2">
                      Temperature: {browserConfig.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={browserConfig.temperature}
                      onChange={(e) => setBrowserConfig({...browserConfig, temperature: parseFloat(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Browser Control Settings */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Browser Control Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Max Steps</label>
                        <input
                          type="number"
                          value={browserConfig.maxSteps}
                          onChange={(e) => setBrowserConfig({...browserConfig, maxSteps: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Max Actions Per Step</label>
                        <input
                          type="number"
                          value={browserConfig.maxActionsPerStep}
                          onChange={(e) => setBrowserConfig({...browserConfig, maxActionsPerStep: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={browserConfig.useVision}
                          onChange={(e) => setBrowserConfig({...browserConfig, useVision: e.target.checked})}
                          className="rounded text-blue-600"
                        />
                        <span className="text-white">Enable Vision/Screenshot Analysis</span>
                      </label>
                      
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={browserConfig.enableScreenshot}
                          onChange={(e) => setBrowserConfig({...browserConfig, enableScreenshot: e.target.checked})}
                          className="rounded text-blue-600"
                        />
                        <span className="text-white">Capture Screenshots</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Tool Calling Method</label>
                      <select
                        value={browserConfig.toolCallingMethod}
                        onChange={(e) => setBrowserConfig({...browserConfig, toolCallingMethod: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      >
                        <option value="auto">Auto</option>
                        <option value="sequential">Sequential</option>
                        <option value="parallel">Parallel</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Saved Configurations */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Saved Configurations</h3>
                  <div className="space-y-2">
                    {savedConfigs.length === 0 ? (
                      <p className="text-gray-400">No saved configurations</p>
                    ) : (
                      savedConfigs.map((config, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-600 rounded p-3">
                          <span className="text-white">{config.name}</span>
                          <button className="text-blue-400 hover:text-blue-300">Load</button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'profiles' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Form Profiles</h2>
                <div className="flex space-x-2">
                  <select
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg"
                  >
                    <option value="default">Default Profile</option>
                    <option value="business">Business Profile</option>
                    <option value="personal">Personal Profile</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={16} className="inline mr-2" />
                    New Profile
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">First Name</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].firstName}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], firstName: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].lastName}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], lastName: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={profiles[selectedProfile].email}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], email: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={profiles[selectedProfile].phone}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], phone: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={profiles[selectedProfile].dateOfBirth}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], dateOfBirth: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Address Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].street}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], street: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">City</label>
                        <input
                          type="text"
                          value={profiles[selectedProfile].city}
                          onChange={(e) => setProfiles({
                            ...profiles,
                            [selectedProfile]: {...profiles[selectedProfile], city: e.target.value}
                          })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">State/Province</label>
                        <input
                          type="text"
                          value={profiles[selectedProfile].state}
                          onChange={(e) => setProfiles({
                            ...profiles,
                            [selectedProfile]: {...profiles[selectedProfile], state: e.target.value}
                          })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">ZIP/Postal Code</label>
                        <input
                          type="text"
                          value={profiles[selectedProfile].zipCode}
                          onChange={(e) => setProfiles({
                            ...profiles,
                            [selectedProfile]: {...profiles[selectedProfile], zipCode: e.target.value}
                          })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Country</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].country}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], country: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].companyName}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], companyName: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].jobTitle}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], jobTitle: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Department</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].department}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], department: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Company Website</label>
                      <input
                        type="url"
                        value={profiles[selectedProfile].companyWebsite}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], companyWebsite: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].linkedin}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], linkedin: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Twitter</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].twitter}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], twitter: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">GitHub</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].github}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], github: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Bio</label>
                      <textarea
                        value={profiles[selectedProfile].bio}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], bio: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Interests (comma-separated)</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].interests}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], interests: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="Technology, AI, Machine Learning"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={profiles[selectedProfile].skills}
                        onChange={(e) => setProfiles({
                          ...profiles,
                          [selectedProfile]: {...profiles[selectedProfile], skills: e.target.value}
                        })}
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="Python, JavaScript, React"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'credentials' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Website Credentials</h2>
              <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus size={16} className="inline mr-2" />
                Add Credential
              </button>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">Gmail</h3>
                      <p className="text-sm text-gray-400">user@gmail.com</p>
                      <p className="text-xs text-gray-500 mt-1">Auto-login enabled</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Integrations</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Workflow size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">n8n</h3>
                        <p className="text-sm text-gray-400">Workflow automation</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Connected</span>
                      <button className="text-gray-400 hover:text-white">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="http://localhost:5678"
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                  />
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Database size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Supabase</h3>
                        <p className="text-sm text-gray-400">Database & Storage</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">Not Connected</span>
                      <button className="text-gray-400 hover:text-white">
                        <Settings size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Project URL"
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="Anon Key"
                      className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'advanced' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Advanced Settings</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Browser Options</h3>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-white">Headless Mode</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-white">Disable Images</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                      <span className="text-white">Block Ads</span>
                    </label>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">User Agent</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg"
                        placeholder="Default browser user agent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="font-medium text-white mb-4">Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Timeout (seconds): <span className="text-white">30</span>
                      </label>
                      <input type="range" min="10" max="120" defaultValue="30" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Max Parallel Tasks: <span className="text-white">3</span>
                      </label>
                      <input type="range" min="1" max="10" defaultValue="3" className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Browser Preview with Browser-Use Controls
  const BrowserPreview = () => {
    const [loading, setLoading] = useState(false);
    const [browserState, setBrowserState] = useState('idle');
    const [currentAction, setCurrentAction] = useState('');

    return (
      <div className="h-full flex flex-col bg-gray-900">
        <div className="bg-gray-800 p-2 flex items-center space-x-2">
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 rounded hover:bg-gray-700 text-gray-400 hover:text-white">
              <ChevronRight size={20} />
            </button>
            <button 
              className="p-2 rounded hover:bg-gray-700 text-gray-400 hover:text-white"
              onClick={() => setLoading(!loading)}
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          
          <div className="flex-1 flex items-center bg-gray-700 rounded-lg px-3 py-1">
            <Globe size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={browserUrl}
              onChange={(e) => setBrowserUrl(e.target.value)}
              className="flex-1 bg-transparent text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            {browserState !== 'idle' && (
              <div className="flex items-center space-x-2">
                <Activity size={16} className="text-green-400 animate-pulse" />
                <span className="text-sm text-gray-300">{currentAction}</span>
              </div>
            )}
            
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded transition-colors ${
                isRecording 
                  ? 'bg-red-600 text-white' 
                  : 'hover:bg-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {isRecording ? <Square size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white relative">
          <iframe
            src={browserUrl}
            className="w-full h-full"
            title="Browser Preview"
            sandbox="allow-same-origin allow-scripts"
          />
          
          {/* Browser-Use Overlay */}
          {browserState !== 'idle' && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Brain size={16} className="text-blue-400" />
                <span className="text-sm">Browser-Use Active</span>
              </div>
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white">Loading...</div>
            </div>
          )}
        </div>

        {isRecording && (
          <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span>Recording browser actions...</span>
            </div>
            <button
              onClick={() => setIsRecording(false)}
              className="px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition-colors"
            >
              Stop Recording
            </button>
          </div>
        )}
      </div>
    );
  };

  // Agents Management Component
  const AgentsManagement = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [agentType, setAgentType] = useState('browser-use');
    const [agentPrompt, setAgentPrompt] = useState('');

    const createAgent = () => {
      if (agentName) {
        setAgents([...agents, {
          id: Date.now(),
          name: agentName,
          type: agentType,
          prompt: agentPrompt,
          status: 'active',
          createdAt: new Date()
        }]);
        setAgentName('');
        setAgentPrompt('');
        setShowCreateModal(false);
      }
    };

    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Browser Automation Agents</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Create Agent</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain size={20} className="text-blue-400" />
                      <h3 className="font-semibold text-white">{agent.name}</h3>
                    </div>
                    <p className="text-sm text-gray-400">Type: {agent.type}</p>
                    {agent.prompt && (
                      <p className="text-sm text-gray-300 mt-2">Prompt: {agent.prompt.substring(0, 100)}...</p>
                    )}
                    <p className="text-sm text-gray-400 mt-1">
                      Created: {agent.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {agent.status}
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-[500px]">
              <h3 className="text-lg font-semibold text-white mb-4">Create Browser Automation Agent</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Agent Type
                  </label>
                  <select
                    value={agentType}
                    onChange={(e) => setAgentType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="browser-use">Browser-Use Agent</option>
                    <option value="web-scraper">Web Scraper</option>
                    <option value="form-filler">Form Filler</option>
                    <option value="email-automation">Email Automation</option>
                    <option value="data-enricher">Data Enricher</option>
                    <option value="custom">Custom Agent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Agent Instructions (Prompt)
                  </label>
                  <textarea
                    value={agentPrompt}
                    onChange={(e) => setAgentPrompt(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Describe what this agent should do..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createAgent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Workflows Component
  const WorkflowsBuilder = () => {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Browser Automation Workflows</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              <span>New Workflow</span>
            </button>
          </div>
        </div>
        <div className="flex-1 bg-gray-900 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Workflow size={48} className="mx-auto mb-4" />
              <p>Create browser automation workflows</p>
              <p className="text-sm mt-2">Drag and drop Browser-Use actions</p>
              <p className="text-sm">Connected to n8n for advanced automation</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Data Management Component
  const DataManagement = () => {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRecords, setSelectedRecords] = useState([]);

    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Data Management</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload size={16} />
                <span>Import Data</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Link size={16} />
                <span>Connect Sheets</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search records..."
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <Filter size={16} />
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Company</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRecords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                        No data records. Import CSV or connect Google Sheets to get started.
                      </td>
                    </tr>
                  ) : (
                    dataRecords.map((record) => (
                      <tr key={record.id} className="border-t border-gray-700">
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded" />
                        </td>
                        <td className="px-4 py-3 text-white">{record.company}</td>
                        <td className="px-4 py-3 text-white">{record.contact}</td>
                        <td className="px-4 py-3 text-white">{record.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-600 text-white">
                            Enriched
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-white">
                              <Eye size={16} />
                            </button>
                            <button className="text-gray-400 hover:text-blue-500">
                              <RefreshCw size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Enrich Selected with Browser-Use
              </button>
              <div className="text-sm text-gray-400">
                Connected to Supabase
              </div>
            </div>
          </div>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold text-white mb-4">Import Data</h3>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 mb-2">Drop CSV file here or click to browse</p>
                <input type="file" accept=".csv" className="hidden" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Select File
                </button>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Main content renderer
  const renderMainContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <ChatInterface />
            </div>
            <div className="h-64 border-t border-gray-700">
              <ActiveTasks />
            </div>
          </div>
        );
      case 'agents':
        return <AgentsManagement />;
      case 'workflows':
        return <WorkflowsBuilder />;
      case 'data':
        return <DataManagement />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-white">Browser Automation Studio</h1>
          <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            Powered by Browser-Use
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Profile: {selectedProfile}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Provider: {browserConfig.provider}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-400">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        {/* Left Panel */}
        <div className="w-1/2 bg-gray-800 border-r border-gray-700">
          {renderMainContent()}
        </div>

        {/* Right Panel - Browser Preview */}
        <div className="flex-1">
          <BrowserPreview />
        </div>
      </div>
    </div>
  );
};

export default BrowserAutomationTool;
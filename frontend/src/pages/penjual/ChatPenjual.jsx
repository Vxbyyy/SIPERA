import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../../styles/penjual/ChatPenjual.css";

function ChatPenjual() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [conversations, setConversations] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const fetchConversations = async () => {
    try {
      const response = await api.get("/api/chat/conversations");
      setConversations(response.data);

      if (response.data.length > 0 && !activeUser) {
        setActiveUser(response.data[0]);
      }
    } catch (error) {
      console.error("Gagal mengambil daftar chat:", error);
    }
  };

  const fetchMessages = async () => {
    if (!activeUser) return;

    try {
      const response = await api.get(`/api/chat/messages/${activeUser.userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Gagal mengambil pesan:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeUser) return;

    try {
      await api.post("/api/chat", {
        receiverId: activeUser.userId,
        message: messageInput,
      });

      setMessageInput("");
      fetchMessages();
      fetchConversations();
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Gagal mengirim pesan.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeUser]);

  return (
    <div className="seller-chat-page">
      <nav className="seller-chat-navbar">
        <div className="seller-chat-logo">
          <div className="seller-chat-logo-box">S</div>
          <h2>
            SIPERA <span>TORAJA</span>
          </h2>
        </div>

        <div className="seller-chat-nav-links">
          <NavLink to="/penjual" end>
            Beranda
          </NavLink>
          <NavLink to="/penjual/riwayat-ternak">Kelola Jualan</NavLink>
          <NavLink to="/penjual/pesanan">Pesanan</NavLink>
          <NavLink to="/penjual/chat">Chat</NavLink>
          <NavLink to="/penjual/profil">Profil</NavLink>
        </div>

        <div className="seller-chat-user">
          <div>
            <strong>{loggedInUser?.nama || "Penjual"}</strong>
            <span>Seller</span>
          </div>
          <button type="button" onClick={handleLogout}>
            ↪
          </button>
        </div>
      </nav>

      <main className="seller-chat-main">
        <section className="seller-chat-header">
          <h1>Chat Pembeli</h1>
          <p>Balas pertanyaan pembeli terkait ternak yang Anda jual.</p>
        </section>

        <section className="chat-layout">
          <div className="chat-list-card">
            <h2>Daftar Chat</h2>

            {conversations.length > 0 ? (
              conversations.map((chat) => (
                <button
                  key={chat.userId}
                  type="button"
                  className={`chat-list-item ${
                    activeUser?.userId === chat.userId ? "active" : ""
                  }`}
                  onClick={() => setActiveUser(chat)}
                >
                  <div className="chat-avatar">{chat.nama.charAt(0)}</div>
                  <div>
                    <h4>{chat.nama}</h4>
                    <p>{chat.lastMessage}</p>
                  </div>
                  <span>{chat.role}</span>
                </button>
              ))
            ) : (
              <p className="chat-empty">Belum ada chat masuk.</p>
            )}
          </div>

          <div className="chat-room-card">
            {activeUser ? (
              <>
                <div className="chat-room-header">
                  <div className="chat-avatar large">
                    {activeUser.nama.charAt(0)}
                  </div>
                  <div>
                    <h2>{activeUser.nama}</h2>
                    <p>{activeUser.role}</p>
                  </div>
                </div>

                <div className="chat-messages">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message ${
                        msg.senderId === loggedInUser?.id ? "seller" : "buyer"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Tulis balasan..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button type="button" onClick={handleSendMessage}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </>
            ) : (
              <div className="chat-empty-room">
                Pilih chat untuk mulai percakapan.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ChatPenjual;
$(document).ready(() => {

  socket.emit("join room", chatId);
  socket.on("typing", () => {
    console.log("user is typing");
  })

  $.get(`/api/chats/${chatId}`, (data) => {
    $("#chatName").text(getChatName(data));
  });

  $.get(`/api/chats/${chatId}/messages`, (data) => {
    
    var messages = [];
    var lastSenderId = "";

    data.forEach((message, index) => {
      var html = createMessageHtml(message, data[index + 1], lastSenderId);
      messages.push(html);

      lastSenderId = message.sender._id;
    })

    var messagesHtml = messages.join("");
    addMessagesHtmlToPage(messagesHtml);

    scrollToBottom(false);

    $(".loadingSpinnerContainer").remove();
    $(".chatContainer").css("visibility", "visible");

  });

});

$("#chatNameButton").click(() => {
  var name = $("#chatNameTextbox").val().trim();

  $.ajax({
    url: "/api/chats/" + chatId,
    type: "PUT",
    data: { chatName: name },
    success: (data, status, xhr) => {
      if (xhr.status != 204) {
        alert("Could not updated");
      } else {
        location.reload();
      }
    },
  });
});

$(".sendMessageButton").click(() => {
  messageSubmitted();
});

$(".inputTextbox").keydown((event) => {

  updateTyping();

  if (event.which === 13 && !event.shiftKey) {
    messageSubmitted();
    return false;
  }
});

function updateTyping() {
  socket.emit("typing", chatId);
}

function addMessagesHtmlToPage(html) {
  $(".chatMessages").append(html);
}

function messageSubmitted() {
  var content = $(".inputTextbox").val().trim();

  if (content != "") {
    sendMessage(content);
    $(".inputTextbox").val("");
  }
}

function sendMessage(content) {
  $.post("/api/messages", { content: content, chatId: chatId }, (data, status, xhr) => {

    if(xhr.status != 201) {
      alert("Could not send message...");
      $(".inputTextbox").val(content);
      return;
    }

    addChatMessageHtml(data);
  });

}

function addChatMessageHtml(message) {
  if(!message || !message._id) {
    alert("Message not valid!");
  }

  var messageDiv = createMessageHtml(message, null, "");

  addMessagesHtmlToPage(messageDiv)
  scrollToBottom(true);

}

function createMessageHtml(message, nextMessage, lastSenderId) {

  var sender = message.sender;
  var senderNama = sender.firstName + " " + sender.lastName;

  var currentSenderId = sender._id;
  var nextSenderId = nextMessage != null ? nextMessage.sender._id : "";

  var isFirst = lastSenderId != currentSenderId;
  var isLast = nextSenderId != currentSenderId;

  var isMine = message.sender._id == userLoggedIn._id;
  var liClassname = isMine ? "mine" : "theirs";

  var nameElement = "";

  if(isFirst) {
    liClassname += " first";
    
    if(!isMine) {
      nameElement = `<span class='senderName'>${senderNama}</span>`;
    }
  }

  var profileImage = "";

  if(isLast) {
    liClassname += " last";
    profileImage = `<img src='${sender.profilePic}' /> `;
  }

  var imageContainer = "";

  if(!isMine) {
    imageContainer = `
      <div class='imageContainer'>
        ${profileImage}
      </div>
    `
  }

  return `
    <li class='message ${liClassname}'>
      ${imageContainer}
      <div class='messageContainer'>
        ${nameElement}
        <span class='messageBody'>
          ${message.content}
        </span>
      </div>
    </li>
  `;


}


function scrollToBottom(animated) {
  var container = $(".chatMessages");
  var scrollHeight = container[0].scrollHeight;

  if(animated) {
    container.animate({ scrollTop: scrollHeight }, "slow");
  }
  else {
    container.scrollTop(scrollHeight);
  }
}